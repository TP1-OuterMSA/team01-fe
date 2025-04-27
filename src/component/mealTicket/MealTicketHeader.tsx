function MealTicketHeader({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  return (
    <div className="text-center mb-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-1">{title}</h1>
      <p className="text-gray-600">{subTitle}</p>
    </div>
  );
}

export default MealTicketHeader;
