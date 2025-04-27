import { MealOption } from "../../type/meal";
interface MealSelectionProps {
  mealOptions: MealOption[];
  selectedMeal: MealOption | null;
  onSelectMeal: (meal: MealOption) => void;
}
function MealSelection({
  mealOptions,
  selectedMeal,
  onSelectMeal,
}: MealSelectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">식권 선택</h2>
      <div className="space-y-3">
        {mealOptions.map((meal) => (
          <div
            key={meal.id}
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
              selectedMeal?.id === meal.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300"
            }`}
            onClick={() => onSelectMeal(meal)}
          >
            <div className="flex-shrink-0 mr-4">
              <span>{meal.icon}</span>
            </div>
            <div className="flex-grow">
              <h3 className="font-medium text-gray-800">{meal.name}</h3>
            </div>
            <div className="text-blue-600 font-semibold">
              {meal.price.toLocaleString()}원
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MealSelection;
