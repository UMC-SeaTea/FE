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

  const [emailError, setEmailError] = useState('');

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPwValid =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+|~={}\[\]:;<>?,./]).{8,20}$/.test(
      password
    );
  const isPwMatch = password === confirmPassword && confirmPassword.length > 0;
  const isStep1Complete =
    isEmailValid && isEmailChecked && isPwValid && isPwMatch;

  const isNicknameValid = /^[a-zA-Z0-9가-힣]{4,}$/.test(nickname);

  const getTitle = () => {
    if (step === 1) return '회원가입';
    if (step === 2) return '프로필';
    return '사용자 닉네임';
  };

  const handleBack = () => {
    if (showImgOption) {
      setShowImgOption(false);
      return;
    }
    if (step === 1) navigate(-1);
    else setStep(step - 1);
  };

  const handleCheckEmail = () => {
    if (!isEmailValid) {
      setEmailError('이메일 주소를 정확히 입력해주세요.');
      return;
    }

    const isDuplicate = false;

    if (isDuplicate) {
      setEmailError('이미 등록된 이메일입니다.');
      setIsEmailChecked(false);
    } else {
      setEmailError('');
      setIsEmailChecked(true);
      alert('사용 가능한 이메일입니다.');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEmailChecked(false);
    setEmailError('');
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
      emailError,
    },
    refs: {
      fileInputRef,
      cameraInputRef,
    },
    computed: {
      isEmailValid,
      isPwValid,
      isPwMatch,
      isStep1Complete,
      isNicknameValid,
      title: getTitle(),
      passwordError:
        password.length > 0 && !isPwValid
          ? '영문, 숫자, 특수문자를 조합하여 입력해주세요. (8-20자)'
          : '',
      confirmPasswordError:
        confirmPassword.length > 0 && password !== confirmPassword
          ? '비밀번호가 일치하지 않습니다.'
          : '',
      nicknameError:
        nickname.length > 0 && !isNicknameValid
          ? '한글, 영문, 숫자를 조합하여 4자 이상 입력해주세요.(공백 제외)'
          : '',
    },
    actions: {
      setStep,
      setEmail,
      setPassword,
      setConfirmPassword,
      setNickname,
      setShowImgOption,
      handleBack,
      handleCheckEmail,
      handleEmailChange,
      handleImageUpload,
      handleSkipImage,
      handleSubmit,
    },
  };
};
