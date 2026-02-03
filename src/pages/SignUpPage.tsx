import SignUpPageHeader from '../components/SignUp/SignUpPageHeader';
import { useSignUp } from '../hooks/useSignUp';

import SignUpAccount from '../components/SignUp/SignUpAccount';
import SignUpProfile from '../components/SignUp/SignUpProfile';
import SignUpNickname from '../components/SignUp/SignUpNickname';

const SignUpPage = () => {
  const { state, refs, computed, actions } = useSignUp();

  return (
    <div
      className="w-full min-h-screen flex flex-col"
      onClick={() => {
        if (state.showImgOption) actions.setShowImgOption(false);
      }}
    >
      <SignUpPageHeader title={computed.title} onBack={actions.handleBack} />

      <div className="w-[335px] mx-auto">
        {state.step === 1 && (
          <SignUpAccount state={state} actions={actions} computed={computed} />
        )}

        {state.step === 2 && (
          <SignUpProfile state={state} actions={actions} refs={refs} />
        )}

        {state.step === 3 && (
          <SignUpNickname state={state} actions={actions} computed={computed} />
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
