USE sk360;

INSERT IGNORE INTO users (username,password,full_name,role_id) VALUES
('chairman','$2a$10$5t1qGkQ2E1...','Bongbong Trinidad',1),
('secretary','$2a$10$XgT0kQ2E3...','SK Secretary',2),
('treasurer','$2a$10$Abc123...','SK Treasurer',3),
('member1','$2a$10$Def456...','Member One',4);
