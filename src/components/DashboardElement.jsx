function DashboardElement({value, unit }) {
  //title: Título del elemento
  //value: Valor del elemento
  //unit: Unidad de medida del elemento
  return (
    <div className="flex flex-col gap-4justify-center items-center bg-slate-50 p-4 rounded-md text-neutral-800">
      <p className="text-2xl">{value} {unit}</p>
    </div>
  );
}

export default DashboardElement;
