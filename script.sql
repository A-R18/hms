INSERT INTO
  roles (role)
values
  ("doctor"),
  ("user");

INSERT INTO
  modules (module)
values
  ("doctors"),
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
  doctor_specialities (speciality)
VALUES
  ('Cardiology'),
  ('Dermatology'),
  ('Pediatrics'),
  ('Orthopedic Surgery'),
  ('Neurology'),
  ('Psychiatry'),
  ('Radiology'),
  ('Anesthesiology'),
  ('Emergency Medicine'),
  ('Internal Medicine'),
  ('Family Medicine'),
  ('General Surgery'),
  ('Oncology'),
  ('Gastroenterology'),
  ('Urology'),
  ('Ophthalmology'),
  ('Obstetrics and Gynecology'),
  ('Endocrinology'),
  ('Pulmonology'),
  ('Nephrology'),
  ('Hematology'),
  ('Infectious Disease'),
  ('Rheumatology'),
  ('Otolaryngology (ENT)'),
  ('Pathology'),
  ('Neurosurgery'),
  ('Plastic Surgery'),
  ('Vascular Surgery'),
  ('Thoracic Surgery'),
  ('Critical Care Medicine'),
  ('Allergy and Immunology'),
  ('Physical Medicine and Rehabilitation'),
  ('Sports Medicine'),
  ('Geriatrics'),
  ('Preventive Medicine'),
  ('Nuclear Medicine'),
  ('Radiation Oncology'),
  ('Pain Medicine'),
  ('Sleep Medicine'),
  ('Forensic Pathology'),
  ('Cardiothoracic Surgery'),
  ('Transplant Surgery'),
  ('Pediatric Surgery'),
  ('Trauma Surgery'),
  ('Colorectal Surgery'),
  ('Hepatology'),
  ('Neonatology'),
  ('Reproductive Endocrinology'),
  ('Gynecologic Oncology'),
  ('Interventional Radiology'),
  ('Child and Adolescent Psychiatry');

INSERT INTO
  allergies (allergy_name)
VALUES
  ('Pollen Allergy (Hay Fever)'),
  ('Dust Mite Allergy'),
  ('Mold Allergy'),
  ('Pet Dander Allergy'),
  ('Penicillin Allergy'),
  ('Shellfish Allergy'),
  ('Peanut Allergy'),
  ('Tree Nut Allergy'),
  ('Egg Allergy'),
  ('Milk Allergy'),
  ('Soy Allergy'),
  ('Wheat Allergy'),
  ('Fish Allergy'),
  ('Sesame Allergy'),
  ('Latex Allergy'),
  ('Insect Sting Allergy'),
  ('Sulfite Allergy'),
  ('MSG Allergy'),
  ('Nickel Allergy'),
  ('Fragrance Allergy'),
  ('Sun Allergy (Solar Urticaria)'),
  ('Exercise-Induced Allergy'),
  ('Cold Urticaria'),
  ('Aspirin Allergy'),
  ('Sulfa Drug Allergy'),
  ('Cephalosporin Allergy'),
  ('Cockroach Allergy'),
  ('Food Coloring Allergy'),
  ('Histamine Intolerance'),
  ('Salicylate Sensitivity');

INSERT INTO
  users (user_name, role_ID, user_email, user_password)
values
  (
    "Dr Kamal",
    1,
    "doc@doc.com",
    "$2a$10$Tcc3/dED25I7aMlU8Z0nlOA4YbJH6l/fKYkkgE5mcViY8L4DZDerK"
  ),
  (
    "Raheem",
    2,
    "raheem@user.com",
    "$2a$10$Tcc3/dED25I7aMlU8Z0nlOA4YbJH6l/fKYkkgE5mcViY8L4DZDerK"
  ),
  (
    "Saleem",
    2,
    "saleem@user.com",
    "$2a$10$Tcc3/dED25I7aMlU8Z0nlOA4YbJH6l/fKYkkgE5mcViY8L4DZDerK"
  ),
  (
    "Dr. Azeem",
    1,
    "azeem@doc.com",
    "$2a$10$Tcc3/dED25I7aMlU8Z0nlOA4YbJH6l/fKYkkgE5mcViY8L4DZDerK"
  );

INSERT INTO
  `doctors` (`user_ID`, `spec_ID`, `contact`)
VALUES
  (1, 4, 1234567890);

INSERT INTO
  `doctors` (`user_ID`, `spec_ID`, `contact`)
VALUES
  (4, 22, 0987654321);