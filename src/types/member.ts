export interface MemberProfileResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    userId: number;
    email: string;
    nickname: string;
    profileImageUrl: string;
    currentType: {
      id: number;
      name: string;
      description: string;
      iconUrl: string;
      colorCode: string;
    };
    /* 저장 공간 개수 관련 추후 수정*/
  };
}
