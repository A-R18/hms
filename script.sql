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
  ("Cardiology"),
  ("Dermatology"),
  ("Pediatrics"),
  ("Orthopedic Surgery"),
  ("Neurology"),
  ("Psychiatry"),
  ("Radiology"),
  ("Anesthesiology"),
  ("Emergency Medicine"),
  ("Internal Medicine"),
  ("Family Medicine"),
  ("General Surgery"),
  ("Oncology"),
  ("Gastroenterology"),
  ("Urology"),
  ("Ophthalmology"),
  ("Obstetrics and Gynecology"),
  ("Endocrinology"),
  ("Pulmonology"),
  ("Nephrology"),
  ("Hematology"),
  ("Infectious Disease"),
  ("Rheumatology"),
  ("Otolaryngology (ENT)"),
  ("Pathology"),
  ("Neurosurgery"),
  ("Plastic Surgery"),
  ("Vascular Surgery"),
  ("Thoracic Surgery"),
  ("Critical Care Medicine"),
  ("Allergy and Immunology"),
  ("Physical Medicine and Rehabilitation"),
  ("Sports Medicine"),
  ("Geriatrics"),
  ("Preventive Medicine"),
  ("Nuclear Medicine"),
  ("Radiation Oncology"),
  ("Pain Medicine"),
  ("Sleep Medicine"),
  ("Forensic Pathology"),
  ("Cardiothoracic Surgery"),
  ("Transplant Surgery"),
  ("Pediatric Surgery"),
  ("Trauma Surgery"),
  ("Colorectal Surgery"),
  ("Hepatology"),
  ("Neonatology"),
  ("Reproductive Endocrinology"),
  ("Gynecologic Oncology"),
  ("Interventional Radiology"),
  ("Child and Adolescent Psychiatry");

INSERT INTO
  allergies (allergy_name)
VALUES
  ("Pollen Allergy (Hay Fever)"),
  ("Dust Mite Allergy"),
  ("Mold Allergy"),
  ("Pet Dander Allergy"),
  ("Penicillin Allergy"),
  ("Shellfish Allergy"),
  ("Peanut Allergy"),
  ("Tree Nut Allergy"),
  ("Egg Allergy"),
  ("Milk Allergy"),
  ("Soy Allergy"),
  ("Wheat Allergy"),
  ("Fish Allergy"),
  ("Sesame Allergy"),
  ("Latex Allergy"),
  ("Insect Sting Allergy"),
  ("Sulfite Allergy"),
  ("MSG Allergy"),
  ("Nickel Allergy"),
  ("Fragrance Allergy"),
  ("Sun Allergy (Solar Urticaria)"),
  ("Exercise-Induced Allergy"),
  ("Cold Urticaria"),
  ("Aspirin Allergy"),
  ("Sulfa Drug Allergy"),
  ("Cephalosporin Allergy"),
  ("Cockroach Allergy"),
  ("Food Coloring Allergy"),
  ("Histamine Intolerance"),
  ("Salicylate Sensitivity");

INSERT INTO
  days (day)
values
  ("MONDAY"),
  ("TUESDAY"),
  ("WEDESDAY"),
  ("THURSDAY"),
  ("FRIDAY"),
  ("SATURDAY");

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

INSERT INTO
  patients (patient_name, `condition`, contact, created_at)
VALUES
  ("Ali Khan", "Flu", 3001112223, NOW()),
  ("Ahmed Raza", "Diabetes", 3001112224, NOW()),
  ("Sara Malik", "Hypertension", 3001112225, NOW()),
  ("Ayesha Noor", "Migraine", 3001112226, NOW()),
  ("Usman Tariq", "Back Pain", 3001112227, NOW()),
  ("Hassan Ali", "Allergy", 3001112228, NOW()),
  ("Fatima Zahra", "Asthma", 3001112229, NOW()),
  ("Bilal Ahmed", "Gastritis", 3001112230, NOW()),
  ("Zainab Iqbal", "Anemia", 3001112231, NOW()),
  ("Hamza Siddiq", "Fever", 3001112232, NOW()),
  (
    "Maryam Saleem",
    "Thyroid Disorder",
    3001112233,
    NOW()
  ),
  ("Imran Sheikh", "Arthritis", 3001112234, NOW()),
  (
    "Noor Ul Ain",
    "Skin Infection",
    3001112235,
    NOW()
  ),
  (
    "Saad Mehmood",
    "High Cholesterol",
    3001112236,
    NOW()
  ),
  (
    "Hina Abbas",
    "Urinary Tract Infection",
    3001112237,
    NOW()
  );

INSERT INTO
  doctors_scheduling (
    id,
    doctor_ID,
    doctor_day_ID,
    doctor_from_time,
    doctor_to_time,
    doc_slot_dur
  )
VALUES
  (1, 1, 5, "09:00:00", "17:00:00", 30), -- Monday, Doctor 1
  (2, 1, 1, "09:00:00", "17:00:00", 30), -- Tuesday, Doctor 1
  (3, 1, 2, "09:00:00", "17:00:00", 30), -- Wednesday, Doctor 1
  (4, 1, 3, "09:00:00", "17:00:00", 30), -- Thursday, Doctor 1
  (5, 1, 4, "09:00:00", "13:00:00", 30), -- Friday, Doctor 1
  (6, 2, 6, "09:00:00", "17:00:00", 30), -- Monday, Doctor 2
  (7, 2, 1, "09:00:00", "17:00:00", 30), -- Tuesday, Doctor 2
  (8, 2, 2, "09:00:00", "17:00:00", 30), -- Wednesday, Doctor 2
  (9, 2, 3, "09:00:00", "17:00:00", 30), -- Thursday, Doctor 2
  (10, 2, 4, "09:00:00", "17:00:00", 30);

-- Friday, Doctor 2
INSERT INTO
  appointments (
    patient_ID,
    doctor_ID,
    appointment_date,
    appointment_time,
    appointment_status,
    created_at
  )
VALUES
  (1, 1, "2026-02-01", "09:00:00", "pending", NOW()),
  (2, 2, "2026-02-01", "09:30:00", "pending", NOW()),
  (3, 1, "2026-02-01", "10:00:00", "pending", NOW()),
  (4, 1, "2026-02-02", "10:30:00", "pending", NOW()),
  (5, 1, "2026-02-02", "11:00:00", "pending", NOW()),
  (6, 2, "2026-02-02", "11:30:00", "pending", NOW()),
  (7, 2, "2026-02-03", "12:00:00", "pending", NOW()),
  (8, 1, "2026-02-03", "12:30:00", "pending", NOW()),
  (9, 1, "2026-02-03", "13:00:00", "pending", NOW()),
  (10, 2, "2026-02-04", "13:30:00", "pending", NOW());