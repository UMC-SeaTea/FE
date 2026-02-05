import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSignUp = () => {
  const navigate = useNavigate();
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

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPwValid =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+|~={}\[\]:;<>?,./]).{8,20}$/.test(
      password
    );
  const isNicknameValid = /^[a-zA-Z0-9가-힣]{4,}$/.test(nickname);

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

    if (
      !isValid ||
      !isEmailValid ||
      !isPwValid ||
      password !== confirmPassword
    ) {
      if (isValid && !isEmailChecked) alert('이메일 중복 확인이 필요합니다.');
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

  const handleSubmit = () => {
    console.log('최종 데이터:', { email, password, nickname, profileImage });
    alert('회원가입 완료!');
    navigate('/');
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
    },
    refs: {
      fileInputRef,
      cameraInputRef,
    },
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
      handleCheckEmail: () => {
        if (!isEmailValid) return;
        setIsEmailChecked(true);
        alert('사용 가능한 이메일입니다.');
      },
      handleNextStep1,
      handleBack: () => (step === 1 ? navigate(-1) : setStep(step - 1)),
      setShowImgOption,
      setNickname,
      handleImageUpload,
      handleSkipImage,
      handleSubmit,
    },
  };
};
