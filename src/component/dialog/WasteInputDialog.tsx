import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useWasteInputForm } from "../../hooks/useWasteInputForm";

interface WasteInputDialogProps {
  open: boolean;
  onClose: () => void;
}

const WasteInputDialog = ({ open, onClose }: WasteInputDialogProps) => {
  const {
    selectedDate,
    mealType,
    handleAmountChange,
    handleMealTypeChange,
    amount,
    handleSubmit,
    handleDateChange,
  } = useWasteInputForm();

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <DialogTitle>음식물 쓰레기 배출량 입력</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <DatePicker
              label="날짜 선택"
              value={selectedDate}
              onChange={handleDateChange}
              slotProps={{
                textField: { fullWidth: true, margin: "normal" },
              }}
              disableFuture={true}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="meal-type-select-label">시간대</InputLabel>
              <Select
                labelId="meal-type-select-label"
                id="meal-type-select"
                value={mealType}
                label="시간대"
                onChange={handleMealTypeChange}
              >
                <MenuItem value="BREAKFAST">조식</MenuItem>
                <MenuItem value="LUNCH">중식</MenuItem>
                <MenuItem value="DINNER">석식</MenuItem>
              </Select>
            </FormControl>

            <TextField
              margin="normal"
              fullWidth
              id="amount"
              label="배출량 (L)"
              type="number"
              value={amount}
              onChange={handleAmountChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} type="button">
            취소
          </Button>
          <Button type="submit" variant="contained" disabled={!amount}>
            제출
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default WasteInputDialog;
