import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import type { SignUpRequest } from '../../types/auth/auth';
import { AxiosError } from 'axios';
import { checkEmailDuplicate } from '../../apis/auth/auth';
import {
  signUp,
  uploadProfileImage,
  checkNicknameDuplicate,
  changeNickname,
} from '../../apis/auth/auth';

export const useSignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [showImgOption, setShowImgOption] = useState(false);

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [emailEmptyError, setEmailEmptyError] = useState('');
  const [passwordEmptyError, setPasswordEmptyError] = useState('');
  const [confirmPasswordEmptyError, setConfirmPasswordEmptyError] =
    useState('');

  const isSocial = location.state?.isSocial;

  useEffect(() => {
    if (isSocial && location.state.socialData) {
      const { nickname: socialNick, profileImage: socialImg } =
        location.state.socialData;

      if (socialNick) setNickname(socialNick);
      if (socialImg) setPreviewUrl(socialImg);

      setStep(3);
    }
  }, [isSocial, location.state]);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPwValid =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+|~={}\[\]:;<>?,./]).{8,20}$/.test(
      password
    );
  const isNicknameValid = /^[a-zA-Z0-9가-힣]{4,}$/.test(nickname);

  const signUpMutation = useMutation({
    mutationFn: async () => {
      let finalProfileUrl = '';

      if (profileImage) {
        try {
          const uploadResponse = await uploadProfileImage(profileImage);
          if (uploadResponse.isSuccess && uploadResponse.result) {
            finalProfileUrl = uploadResponse.result;
          } else {
            throw new Error(uploadResponse.message || '이미지 업로드 실패');
          }
        } catch (error) {
          console.error('Profile upload failed:', error);
          throw error;
        }
      }

      const requestData: SignUpRequest = {
        email,
        password,
        passwordConfirm: confirmPassword,
        nickname,
        profile_url: finalProfileUrl,
      };

      return await signUp(requestData);
    },
    onSuccess: (response) => {
      if (response.isSuccess) {
        if (isSocial) {
          alert('회원가입이 완료되었습니다!');
          navigate('/', { replace: true });
        } else {
          alert('회원가입이 완료되었습니다! 로그인해주세요.');
          navigate('/login/start');
        }
      } else {
        alert(response.message || '회원가입에 실패했습니다.');
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMsg =
        error.response?.data?.message || '회원가입 중 오류가 발생했습니다.';
      alert(errorMsg);
    },
  });

  const socialCompleteMutation = useMutation({
    mutationFn: async () => {
      return await changeNickname(nickname);
    },
    onSuccess: (response) => {
      if (response.isSuccess) {
        alert('가입이 완료되었습니다! 환영합니다.');
        navigate('/', { replace: true });
      } else {
        alert(response.message || '정보 설정에 실패했습니다.');
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      alert(error.response?.data?.message || '오류가 발생했습니다.');
    },
  });

  const handleCheckEmail = async () => {
    if (!email) {
      setEmailEmptyError('이메일을 입력해주세요.');
      return;
    }
    if (!isEmailValid) {
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    }

    try {
      const response = await checkEmailDuplicate(email);

      if (response.isSuccess) {
        setIsEmailChecked(true);
        alert(response.message || '사용 가능한 이메일입니다.');
      } else {
        setIsEmailChecked(false);
        alert(response.message || '이미 사용 중인 이메일입니다.');
      }
    } catch (error) {
      setIsEmailChecked(false);
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMsg =
        axiosError.response?.data?.message ||
        '중복 확인 중 오류가 발생했습니다.';
      alert(errorMsg);
    }
  };

  const handleNextStep1 = () => {
    let isValid = true;
    if (!email) {
      setEmailEmptyError('이메일을 입력해주세요');
      isValid = false;
    }
    if (!password) {
      setPasswordEmptyError('비밀번호를 입력해주세요');
      isValid = false;
    }
    if (!confirmPassword) {
      setConfirmPasswordEmptyError('비밀번호를 입력해주세요');
      isValid = false;
    }

    if (!isValid || !isEmailValid || !isPwValid || password !== confirmPassword)
      return;
    if (!isEmailChecked) {
      alert('이메일 중복 확인이 필요합니다.');
      return;
    }
    setStep(2);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setShowImgOption(false);
      setStep(3);
    }
  };

  const handleSkipImage = () => {
    setProfileImage(null);
    setPreviewUrl(null);
    setStep(3);
  };

  const handleBack = () => {
    if (isSocial) {
      if (step === 2) {
        navigate('/login/start');
        return;
      }
    }
    step === 1 ? navigate(-1) : setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!isNicknameValid) return;

    // 1. 소셜 로그인인 경우: 중복 체크 없이 바로 완료 처리 (HEAD 로직)
    if (isSocial) {
      socialCompleteMutation.mutate();
      return;
    }

    // 2. 일반 회원가입인 경우: 닉네임 중복 체크 후 가입 (Develop 로직)
    try {
      const checkResponse = await checkNicknameDuplicate(nickname);

      if (checkResponse.isSuccess) {
        signUpMutation.mutate();
      } else {
        alert(checkResponse.message || '이미 사용 중인 닉네임입니다.');
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message ||
        '닉네임 중복 확인 중 오류가 발생했습니다.';
      alert(errorMsg);
    }
  };

  return {
    state: {
      step,
      email,
      password,
      confirmPassword,
      nickname,
      isEmailChecked,
      showImgOption,
      profileImage,
      previewUrl,
      emailEmptyError,
      passwordEmptyError,
      confirmPasswordEmptyError,
      isPending: signUpMutation.isPending || socialCompleteMutation.isPending,
    },
    refs: { fileInputRef, cameraInputRef },
    computed: {
      title: step === 1 ? '회원가입' : step === 2 ? '프로필' : '사용자 닉네임',
      emailFormatError:
        email.length > 0 && !isEmailValid
          ? '이메일 형식이 올바르지 않습니다.'
          : '',
      passwordFormatError:
        password.length > 0 && !isPwValid
          ? '영문, 숫자, 특수문자를 조합하여 입력해주세요. (8-20자)'
          : '',
      matchError:
        confirmPassword.length > 0 && password !== confirmPassword
          ? '비밀번호가 일치하지 않습니다.'
          : '',
      isNicknameValid,
      nicknameError:
        nickname.length > 0 && !isNicknameValid
          ? '한글, 영문, 숫자를 조합하여 4자 이상 입력해주세요.'
          : '',
    },
    actions: {
      handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailEmptyError('');
        setIsEmailChecked(false);
      },
      handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPasswordEmptyError('');
      },
      handleConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordEmptyError('');
      },
      handleCheckEmail,
      handleNextStep1,
      handleBack,
      setShowImgOption,
      setNickname,
      handleImageUpload,
      handleSkipImage,
      handleSubmit,
    },
  };
};
