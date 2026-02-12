export type StepStyle = {
  progress: string; 
  border: string;   
  text: string;    
  cardBg: string;   
};

export const STEP_STYLES: readonly StepStyle[] = [
  
  { progress: "#A89EFF", border: "#7464FF", text: "#2F16FF", cardBg: "#F7F6FF" },
  
  { progress: "#C898FF", border: "#BF86FF", text: "#993FFF", cardBg: "#FAF5FF" },
  
  { progress: "#78C2FF", border: "#78C2FF", text: "#2685EA", cardBg: "#F6FBFF" },
  
  { progress: "#6DEDD4", border: "#6DEDD4", text: "#17C4A2", cardBg: "#F1FFFC" },
] as const;

export function getStepStyle(stepIndex: number): StepStyle {
  const i = Math.max(0, Math.min(STEP_STYLES.length - 1, stepIndex));
  return STEP_STYLES[i];
}
