import { Box, Button, Typography } from "@mui/material";

interface TitleHeaderProps {
  title: string;
  buttonText: string;
  onClick: () => void;
  description?: string;
  isShowButton?: boolean;
}
/**
 * 제목과 버튼이 포함된 헤더 컴포넌트입니다.
 * 페이지 상단에 일관된 스타일의 제목과 액션 버튼을 제공합니다.
 *
 * @param {string} props.title - 헤더에 표시될 제목
 * @param {string} props.description - 헤더에 표시될 설명
 * @param {string} props.buttonText - 버튼에 표시될 텍스트
 * @param {() => void} props.onClick - 버튼 클릭 시 실행할 함수
 * @param {boolean} props.isShowButton - 버튼 표시 여부
 */
const TitleHeader = ({
  title,
  description,
  buttonText,
  onClick,
  isShowButton = false,
}: TitleHeaderProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <div className="flex items-center justify-between bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
        <div>
          <Typography variant="h5" component="h1">
            {title}
          </Typography>
          <Typography variant="body2" className="text-gray-500 mt-1">
            {description}
          </Typography>
        </div>
        {isShowButton && (
          <Button variant="contained" onClick={onClick}>
            {buttonText}
          </Button>
        )}
      </div>
    </Box>
  );
};

export default TitleHeader;
