import Link from "next/link";
import "@/scss/layout.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRightToBracket,
  faShareFromSquare,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { auth, signOut } from "@/app/lib/auth/auth";

const Header = async () => {
  const session = await auth(); // ユーザー情報を取得

  return (
    <header className="header">
      <h1 className="header__title">
        <a href="/">MyBlog</a>
      </h1>
      <nav className="header__nav">
        <ul className="header__items">
          <li className="header__item">
            <Link href="/">
              <FontAwesomeIcon icon={faHouse} />
            </Link>
          </li>
          <li className="header__item">
            <Link href="/dashboard/blog/page/1">
              <FontAwesomeIcon icon={faBookOpen} />
            </Link>
          </li>
          <li className="header__item">
            {session?.user ? (
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button>
                  <FontAwesomeIcon icon={faShareFromSquare} />
                </button>
              </form>
            ) : (
              <div className="flex gap-[40px]">
                <Link href="/registration/login">
                  <FontAwesomeIcon icon={faRightToBracket} />
                </Link>
                <Link href="/registration/signin">
                  <FontAwesomeIcon icon={faUserPlus} />
                </Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
