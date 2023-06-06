import { Link, Outlet, NavLink, useLoaderData } from "react-router-dom";
import { requireAuth } from "../../AuthRequired";
import { getHostVans } from "../../Api";
// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params, request }) {
  await requireAuth(request);
  return getHostVans(params.id);
}

const HostVansLayout = () => {
  const van = useLoaderData();

  const carTypeStyle = {
    background: "",
  };
  if (van) {
    if (van.type == "simple") carTypeStyle.background = "#E17654";
    if (van.type == "rugged") carTypeStyle.background = "#115E59";
    if (van.type == "luxury") carTypeStyle.background = "black";
  }

  return (
    <div>
      <div className="my-5">
        <Link to=".." relative="path">
          {`<-`}
          <span>Back to all vans</span>
        </Link>
      </div>

      <div className="bg-[#ffffff] p-[25px] mb-5 rounded-md">
        <div className="flex flex-row  gap-5 items-center">
          <div className="w-1/3 overflow-hidden rounded-xl">
            <img src={van.imageUrl} alt={van.name} />
          </div>
          <div>
            <div
              style={{ background: carTypeStyle.background }}
              className="flex justify-center py-1 rounded-md text-[#ffffff] w-fit px-3"
            >
              {van.type}
            </div>
            <h1 className="font-bold text-Headers text-xl">{van.name}</h1>
            <div className="font-bold text-[20px]">
              ${van.price}
              <span className=" font-medium ">/day</span>
            </div>
          </div>
        </div>
        <ul className="flex felx-row gap-5 my-5">
          <li>
            <NavLink
              to="."
              end
              className={({ isActive }) =>
                isActive ? "underline font-bold" : null
              }
            >
              Details
            </NavLink>
          </li>
          <li>
            <NavLink
              to="pricing"
              className={({ isActive }) =>
                isActive ? "underline font-bold" : null
              }
            >
              Pricing
            </NavLink>
          </li>
          <li>
            <NavLink
              to="photos"
              className={({ isActive }) =>
                isActive ? "underline font-bold" : null
              }
            >
              Photos
            </NavLink>
          </li>
        </ul>
        <Outlet context={{van}} />
      </div>
    </div>
  );
};

export default HostVansLayout;
