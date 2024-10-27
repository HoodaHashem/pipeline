import { ChangeEvent, useEffect, useState } from "react";
import SearchBar from "../../Ui/SearchBar";
import Avatar from "../Avatar";
import useDebounce from "../../../hooks/useDebounce";
import { searchForFriend } from "../../../lib/apiCenter";

const FriendsSection = () => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState([]);
  const debouncedSearch = useDebounce(searchText);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      const users = await searchForFriend({ search: debouncedSearch });
      setUsers(users.users);
      setIsLoading(false);
    };
    if (debouncedSearch) loadUsers();
    if (!debouncedSearch) setUsers([]);
  }, [debouncedSearch]);

  return (
    <div className="relative transition-all duration-500 container my-2 flex flex-col justify-center items-center">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
        <SearchBar
          input={searchText}
          handleChange={handleChange}
          loadingState={isLoading}
          users={users}
          debouncedSearch={debouncedSearch}
        />
      </div>
      <ul className="pt-20">
        <li>
          <Avatar src="./girl.jpeg" alt="girl" size="md" />
        </li>
        <li>
          <Avatar src="./girl.jpeg" alt="girl" size="md" />
        </li>
        <li>
          <Avatar src="./girl.jpeg" alt="girl" size="md" />
        </li>
        <li>
          <Avatar src="./girl.jpeg" alt="girl" size="md" />
        </li>
      </ul>
    </div>
  );
};

export default FriendsSection;