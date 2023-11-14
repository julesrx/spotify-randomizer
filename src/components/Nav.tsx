import type { UserProfile } from "@spotify/web-api-ts-sdk";
import {
  NavLink,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from "react-router-dom";

import auth from "~/auth/provider";
import Devices from "components/Devices";

export default function Nav() {
  const profile = useLoaderData() as UserProfile;
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const logout = async () => {
    await auth.signout();
    navigate("/", { replace: true });
    revalidator.revalidate();
  };

  const avatar = profile.images.sort((a, b) => a.height - b.height)[0].url;

  return (
    <nav className="flex p-2 justify-between">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/albums">Albums</NavLink>
        </li>

        <li>
          <NavLink to="/queue">Current queue</NavLink>
        </li>
      </ul>

      <div>
        <Devices />

        <img src={avatar} className="w-16 h-16" />

        <button type="button" onClick={() => logout()}>
          Logout
        </button>
      </div>
    </nav>
  );
}
