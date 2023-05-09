import { useEffect, useState } from "react";
import "../assets/Server";
import { Link, useSearchParams } from "react-router-dom";

const Vans = () => {
  const [vans, setVans] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter = searchParams.get("type");

  const [filterButtonColor, setFilterButtonColor] = useState({
    Simple: false,
    Luxury: false,
    Rugged: false,
  });

  const HandelFilter = (text) => {
    if (text.target.innerText == "Clear filters") {
      setSearchParams({});
    } else {
      setSearchParams({ type: text.target.innerText });
    }

    const updatedFilterButtonColor = {
      Simple: false,
      Luxury: false,
      Rugged: false,
    };

    updatedFilterButtonColor[text.target.innerText] = true;

    setFilterButtonColor(updatedFilterButtonColor);
  };

  useEffect(() => {
    const fetchVans = async () => {
      try {
        const response = await fetch("/api/vans");
        const data = await response.json();
        setVans(data.vans);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVans();
  }, []);

  const filledData = typeFilter
    ? vans.filter((ob) => ob.type.toLowerCase() == typeFilter.toLowerCase())
    : vans;

  const cars = () => {
    if (filledData) {
      return filledData.map((car) => {
        const carTypeStyle = {
          background: "",
        };

        if (car.type == "simple") carTypeStyle.background = "#E17654";
        if (car.type == "rugged") carTypeStyle.background = "#115E59";
        if (car.type == "luxury") carTypeStyle.background = "black";

        return (
          <Link to={`/vans/${car.id}`} key={car.id}>
            <div>
              <div className=" rounded-xl overflow-hidden">
                <img src={car.imageUrl} alt={car.name} />
              </div>
              <div className="flex justify-between">
                <h3 className="text-Headers font-semibold text-[20px]">
                  {car.name}
                </h3>
                <div className="flex flex-col relative h-fit">
                  <span className="text-Headers font-semibold text-[20px]">
                    ${car.price}
                  </span>
                  <span className="text-sm text-Headers absolute -bottom-3">
                    /day
                  </span>
                </div>
              </div>
              <div
                style={{ background: carTypeStyle.background }}
                className="w-fit text-BG px-3 py-1 rounded-md capitalize"
              >
                {car.type}
              </div>
            </div>
          </Link>
        );
      });
    } else {
      return <div>Loading</div>;
    }
  };

  return (
    <div className="container my-auto">
      <h1
        className="font-bold text-Headers text-xl
      mt-5"
      >
        Explore our van options
      </h1>
      <div className="flex flex-row gap-5 items-center flex-wrap">
        <button
          className="py-1 px-3 bg-[#FFEAD0] text-[#4D4D4D] rounded-sm"
          onClick={(text) => HandelFilter(text)}
          style={
            filterButtonColor.Simple
              ? { background: "#E17654", color: "white" }
              : null
          }
        >
          Simple
        </button>
        <button
          className="py-1 px-3 bg-[#FFEAD0] text-[#4D4D4D] rounded-sm"
          onClick={(text) => HandelFilter(text)}
          style={
            filterButtonColor.Luxury
              ? { background: "#115E59", color: "white" }
              : null
          }
        >
          Luxury
        </button>
        <button
          className="py-1 px-3 bg-[#FFEAD0] text-[#4D4D4D] rounded-sm"
          onClick={(text) => HandelFilter(text)}
          style={
            filterButtonColor.Rugged
              ? { background: "black", color: "white" }
              : null
          }
        >
          Rugged
        </button>
        {typeFilter ? (
          <button
            className="hover:underline"
            onClick={(text) => HandelFilter(text)}
          >
            Clear filters
          </button>
        ) : null}
      </div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 my-5">{cars()}</div>
    </div>
  );
};

export default Vans;
