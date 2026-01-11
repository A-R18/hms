INSERT INTO
  roles (role)
values
  ("doctor"),
  ("user");
  
  INSERT INTO modules (module)
  values("doctors"),
  ("users"),
  ("patients"),
  ("patients_diagnosis");

INSERT INTO
  PRIVILEGES (privilege)
values
  ("CREATE"),

  ("READ"),

  ("UPDATE"),

  ("DELETE");

INSERT INTO
  permissions (role_ID, privilege_ID, module_ID)
VALUES
  (2, 1, 2),
  (2, 2, 2),
  (2, 3, 2),
  (2, 4, 2),
  (2, 1, 1),
  (2, 2, 1),
  (2, 3, 1),
  (2, 4, 1),
  (2, 1, 3),
  (2, 2, 3),
  (2, 3, 3),
  (1, 1, 4),
  (1, 2, 4),
  (1, 3, 4),
  (1, 4, 4);

INSERT INTO
  users (
    user_name,
    role_ID,
    user_email,
    user_password
  )
values
  ("Dr Kamal", 1, "doc@doc.com", "Pakistan123"),

  ("Raheem", 2, "raheem@user.com", "Pakistan123"),

  ("Saleem", 2, "saleem@user.com", "Pakistan123"),

  ("Dr. Azeem", 1, "azeem@doc.com", "Pakistan123");



        -- npx knex migrate:latest --knexfile="./app/config/dbMod.js"