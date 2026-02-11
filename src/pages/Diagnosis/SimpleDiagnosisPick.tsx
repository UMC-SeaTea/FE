// src/pages/Diagnosis/SimpleDiagnosisPick.tsx
import clsx from 'clsx';
import { useMemo, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../apis/axios';

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type KeywordItem = { id: string; label: string };

type QuickDiagnosisResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    resultTypeCode: string; 
    keywords: string[];
    scores: Record<string, number>;
  };
};

const BRAND = '#2F16FF';
const SELECT_BG = '#F2F1FF';

const LABEL_TO_CODE: Record<string, string> = {
  감각적인: 'SENSUAL',
  부드러운: 'SOFT',
  슈가러시: 'SUGAR_RUSH',
  잔잔한: 'TRANQUIL',
  지평선: 'HORIZON',
  오가닉: 'ORGANIC',
  실험적: 'EXPERIMENTAL',
  취향존중: 'TASTE_RESPECT',
  시원한: 'COOL',
  새콤달콤: 'SWEET_SOUR',
  하이텐션: 'HIGH_TENSION',
  명상적: 'MEDITATIVE',
  리드미컬: 'RHYTHMICAL',
  예측불가: 'UNPREDICTABLE',
  셀프케어: 'SELF_CARE',
  새로운: 'NEW',
  미학적인: 'AESTHETIC',
  컴포트존: 'COMFORT_ZONE',
};

export default function SimpleDiagnosisPick() {
  const navigate = useNavigate();

  const KEYWORDS = useMemo(
    () => [
      '감각적인',
      '부드러운',
      '슈가러시',
      '잔잔한',
      '지평선',
      '오가닉',
      '실험적',
      '취향존중',
      '시원한',
      '새콤달콤',
      '하이텐션',
      '명상적',
      '리드미컬',
      '예측불가',
      '셀프케어',
      '새로운',
      '미학적인',
      '컴포트존',
    ],
    []
  );

  const rows = useMemo(() => {
    const pattern = [4, 3, 4, 3, 4];
    const need = pattern.reduce((a, b) => a + b, 0);

    const shuffled = shuffle(KEYWORDS);
    const list = [...shuffled];

    
    if (list.length < need) {
      const extra = list[Math.floor(Math.random() * list.length)];
      list.push(extra);
    }

    const fixed = list.slice(0, need);

    const items: KeywordItem[] = fixed.map((label, idx) => ({
      id: `kw-${idx}`,
      label,
    }));

    const out: KeywordItem[][] = [];
    let idx = 0;
    for (const n of pattern) {
      out.push(items.slice(idx, idx + n));
      idx += n;
    }
    return out;
  }, [KEYWORDS]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const canSubmit = selectedIds.length === 3;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleKeyword = (id: string) => {
    setSelectedIds((prev) => {
      const isSelected = prev.includes(id);
      if (isSelected) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const handleSubmit = async () => {
    if (!canSubmit || isSubmitting) return;

    const flat = rows.flat();
    const selectedLabels = selectedIds
      .map((id) => flat.find((x) => x.id === id)?.label)
      .filter(Boolean) as string[];

    
    const keywordCodes = selectedLabels
      .map((label) => LABEL_TO_CODE[label])
      .filter(Boolean);

    
    if (keywordCodes.length !== 3) {
      alert('키워드 매핑이 누락됐어요.');
      return;
    }

    setIsSubmitting(true);

    try {
      
      const { data } = await axiosInstance.post<QuickDiagnosisResponse>(
        '/api/diagnosis/quick',
        { keywords: keywordCodes }
      );

      
      if (!data?.isSuccess) {
        alert(data?.message ?? '간단진단 요청에 실패했어요.');
        return;
      }

      navigate('/diagnosis/result/loading', {
        state: {
          source: 'simple',
          simpleKeywords: selectedLabels, 
          simpleKeywordCodes: keywordCodes, 
          quickResult: data.result,
        },
      });
    } catch (err: any) {

      const status = err?.response?.status;

      if (status === 401) {
        alert('로그인이 필요해요. )');
      } else if (status === 403) {
        alert('접근 권한이 없어요.');
      } else {
        alert('서버 요청에 실패했어요. ');
      }

      console.error('Quick diagnosis API error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        rowRefs.current.forEach((el) => {
          if (!el) return;
          const maxScroll = el.scrollWidth - el.clientWidth;
          if (maxScroll > 0) el.scrollLeft = maxScroll / 2;
        });
      });
    });
  }, [rows]);

  return (
    <main
      className="
        relative min-h-screen w-full flex flex-col items-center overflow-hidden
        bg-[linear-gradient(180deg,_#FFFFFF_0%,_rgba(186,195,255,0.30)_100%)]
      "
    >
      <section className="w-full flex flex-col items-center pt-[160px] text-center px-[20px]">
        <h1 className="font-title text-title-4 leading-[28px] text-footer">
          Quick Taste
        </h1>
        <p className="mt-[12px] font-body text-body-2 text-black-2 leading-[22px] tracking-[-0.025em]">
          나에게 꼭 맞는 휴식을 찾아보세요
        </p>
      </section>

      <section className="w-full mt-[44px]">
        <div className="w-full flex flex-col gap-y-[14px]">
          {rows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              ref={(el) => {
                rowRefs.current[rowIdx] = el;
              }}
              className="
                w-full overflow-x-auto overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
              "
            >
              <div className="min-w-full flex justify-center">
                <div className="w-max inline-flex gap-x-[10px] px-[20px]">
                  {row.map((item) => {
                    const isOn = selectedIds.includes(item.id);

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleKeyword(item.id)}
                        style={{
                          backgroundColor: isOn ? SELECT_BG : '#FFFFFF',
                          borderColor: isOn ? BRAND : 'transparent',
                          color: isOn ? BRAND : '#77767E',
                        }}
                        className="
                          h-[46px] px-[20px] rounded-[100px]
                          font-body text-body-2 text-gray-200 leading-[20px] whitespace-nowrap
                          border border-solid
                          backdrop-blur-[4px]
                          shadow-[0_0_8px_rgba(251,251,255,0.5)]
                          transition-all duration-150 cursor-pointer
                        "
                        aria-pressed={isOn}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full mt-auto pb-[22px] flex flex-col items-center px-[20px]">
        <p className="mb-[14px] text-center font-body text-[14px] leading-[140%] tracking-[-0.02em] text-gray-100">
          지금 당신의 마음에 가장 가까운
          <br />
          키워드{' '}
          <span className="font-body text-body-3 text-gray-100">3개</span>를
          선택해주세요.
        </p>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit || isSubmitting}
          className={clsx(
            'w-[350px] h-[53px] rounded-[25px]',
            'font-body text-body-title transition-all duration-150',
            canSubmit && !isSubmitting
              ? 'bg-[#2F16FF] text-white border border-transparent cursor-pointer'
              : 'bg-transparent text-light-blue border border-light-blue cursor-not-allowed'
          )}
        >
          {isSubmitting ? '진단 중...' : '결과 확인하기'}
        </button>
      </section>
    </main>
  );
}
