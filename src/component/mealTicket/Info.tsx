function Info() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">이용 안내</h2>
      <ul className="space-y-2 text-gray-600 text-sm">
        <li>• 구매한 식권은 모바일 학생증에서 확인할 수 있습니다.</li>
        <li>• 식권은 구매일로부터 30일간 유효합니다.</li>
        <li>• 환불은 미사용 식권에 한해 가능합니다.</li>
        <li>• 문의: 학생지원팀 02-1234-5678</li>
      </ul>
    </div>
  );
}

export default Info;
