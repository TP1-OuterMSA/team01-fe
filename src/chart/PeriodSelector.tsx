import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { Periods } from "../type/chart";

interface PeriodSelectorProps {
  period: Periods;
  onChange: (period: Periods) => void;
}

const PeriodSelector = ({ period, onChange }: PeriodSelectorProps) => {
  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newPeriod: Periods | null
  ) => {
    if (newPeriod !== null) {
      onChange(newPeriod);
    }
  };

  return (
    <ToggleButtonGroup
      value={period}
      exclusive
      onChange={handleChange}
      aria-label="기간 선택"
      sx={{ mb: 2 }}
    >
      <ToggleButton value="week" aria-label="일주일">
        일주일
      </ToggleButton>
      <ToggleButton value="month" aria-label="1개월">
        1개월
      </ToggleButton>
      <ToggleButton value="quarter" aria-label="3개월">
        3개월
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default PeriodSelector;
