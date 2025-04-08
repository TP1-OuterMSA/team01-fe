import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { MealType } from "../type/chart";

interface MealTypeSelectorProps {
  mealType: MealType;
  handleMealTypeChange: (
    event: React.MouseEvent<HTMLElement>,
    newMealType: MealType
  ) => void;
}

function MealTypeSelector({
  mealType,
  handleMealTypeChange,
}: MealTypeSelectorProps) {
  return (
    <Box sx={{ mb: 3, width: "100%" }}>
      <ToggleButtonGroup
        value={mealType}
        exclusive
        onChange={handleMealTypeChange}
        aria-label="식사 유형 선택"
        color="primary"
        sx={{ width: "100%", mb: 2 }}
      >
        <ToggleButton value="BREAKFAST" aria-label="조식" sx={{ flex: 1 }}>
          조식
        </ToggleButton>
        <ToggleButton value="LUNCH" aria-label="중식" sx={{ flex: 1 }}>
          중식
        </ToggleButton>
        <ToggleButton value="DINNER" aria-label="석식" sx={{ flex: 1 }}>
          석식
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

export default MealTypeSelector;
