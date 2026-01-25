import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DiagnosisProgressBar from '../../components/Diagnosis/DiagnosisProgressBar';
import DiagnosisTopBar from '../../components/Diagnosis/DiagnosisTopBar';
import DiagnosisWaveBackground from '../../components/Diagnosis/DiagnosisWaveBackground';
import { useDiagnosisDetail } from '../../components/Diagnosis/useDiagnosisDetail';
import QuestionRenderer from '../../components/Diagnosis/QuestionRenderer';

export default function DiagnosisDetail() {
  const navigate = useNavigate();

  const {
    stepIndex,
    total,
    current,
    value,
    isNextEnabled,
    setAnswer,
    goNext,
    goBack,
  } = useDiagnosisDetail();

  const [, setPicked] = useState(false);

  useEffect(() => {
    setPicked(false);
  }, [stepIndex]);

  if (!current) return null;

  const isLastStep = stepIndex === total - 1;
  const isMulti = current.type === 'multi_select';

  const selectedIds =
    current.type === 'multi_select'
      ? Array.isArray(value)
        ? (value as string[])
        : typeof value === 'string'
          ? [value]
          : []
      : [];

  const onBack = () => {
    if (stepIndex === 0) navigate(-1);
    else goBack();
  };

  const onResult = () => {
    navigate('/diagnosis/result/loading', {
      state: {
        source: 'detail',
      },
    });
  };

  const triggerPickedThenNext = (delayMs: number) => {
    setPicked(true);
    window.setTimeout(() => {
      setPicked(false);
      goNext();
    }, delayMs);
  };

  return (
    <div className="relative min-h-dvh bg-white overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <DiagnosisWaveBackground stepIndex={stepIndex} />
      </div>

      <div className="relative z-10 pt-[80px] pb-[120px]">
        <DiagnosisProgressBar
          stepIndex={stepIndex}
          totalSteps={total}
          theme={current.theme}
        />

        <div className="mt-[28px]">
          <DiagnosisTopBar title={current.title} onBack={onBack} />
        </div>

        <div className="mt-[170px] px-[20px]">
          <div className="mx-auto w-[335px]">
            <QuestionRenderer
              q={current}
              value={value}
              onChange={(v) => {
                setAnswer(v);

                if (current.type === 'two_choice') {
                  triggerPickedThenNext(120);
                }
              }}
              onCommit={() => {
                if (current.type === 'dial') {
                  triggerPickedThenNext(420);
                }
              }}
            />
          </div>
        </div>

        {!isLastStep && current.type === 'multi_select' && (
          <div className="mt-[28px] px-[20px]">
            <div className="mx-auto w-[335px]">
              <button
                type="button"
                onClick={() => triggerPickedThenNext(140)}
                disabled={!isNextEnabled}
                className={[
                  'w-full h-[52px] rounded-[14px]',
                  'font-body text-body-title leading-[140%] tracking-[-0.025em] transition-opacity',
                  isNextEnabled
                    ? 'bg-brand text-white'
                    : 'bg-gray-200 text-gray-500',
                ].join(' ')}
              >
                다음
              </button>
            </div>
          </div>
        )}
      </div>

      {isLastStep && isMulti && (
        <div className="fixed left-0 right-0 bottom-0 z-20 px-[20px] pb-[34px]">
          <div className="mx-auto w-[335px]">
            <button
              type="button"
              onClick={onResult}
              disabled={selectedIds.length === 0}
              className={[
                'w-full h-[50px] rounded-[25px] px-[14px]',
                'flex items-center justify-center',
                'font-body text-body-title leading-[140%] tracking-[-0.025em]',
                selectedIds.length === 0
                  ? 'bg-gray-400 text-gray-100'
                  : 'bg-brand text-white',
              ].join(' ')}
            >
              결과 확인하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
