import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

const capacityMap = {
  small: { min: 0, max: 3 },
  medium: { min: 4, max: 7 },
  large: { min: 8, max: 200 },
};

async function CabinList({ filter }) {
  const cabins = await getCabins();
  if (!cabins.length) {
    return null;
  }

  const displayCabins =
    filter === "all"
      ? cabins
      : cabins.filter(
          (cabin) =>
            cabin.maxCapacity >= capacityMap[filter].min &&
            cabin.maxCapacity <= capacityMap[filter].max,
        );

  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
