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

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPwValid = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(password);
  const isPwMatch = password === confirmPassword && confirmPassword.length > 0; 
  const isStep1Complete = isEmailValid && isEmailChecked && isPwValid && isPwMatch;

  const getTitle = () => {
    if (step === 1) return "회원가입";
    if (step === 2) return "프로필";
    return "사용자 닉네임";
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
    if (!isEmailValid) return alert("이메일 형식을 확인해주세요.");
    alert("사용 가능한 이메일입니다.");
    setIsEmailChecked(true);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEmailChecked(false);
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

  const handleSubmit = () => {
    console.log("최종 데이터:", { email, password, nickname, profileImage });
    alert("회원가입 완료!");
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
      title: getTitle(),
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
      handleSubmit,
    }
  };
};