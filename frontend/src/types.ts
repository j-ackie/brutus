type User = {
  id: string;
  username: string;
  email: string;
  profile_picture_url: string;
};

type Class = {
  id: number;
  class_name: string;
  department: string;
};

enum WantType {
  CLASS = "class",
  DEPARTMENT = "department",
  CATEGORY = "category",
}

type Want = {
  id: number;
  want_type: WantType;
  class_id: number;
  user_id: string;
};

type Listing = {
  id: number;
  poster: User;
  title: string;
  description: string;
  have_class: Class;
  want: Want;
  created_at: string;
};

export { Listing, Want, Class, User };
