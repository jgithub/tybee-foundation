INSERT INTO entity 
(id, type, pin, comment) VALUES (1, 'user', '1234', 'THE System User');
INSERT INTO entity 
(id, type, pin, comment) VALUES (100, 'user', 'xxxx', 'John Q. Public');
INSERT INTO entity 
(id, type, pin, comment) VALUES (1001, 'user', '1001', 'User #1001');


INSERT INTO qa_question 
(uuid, phrase, sequence, audio_file) VALUES ('1ef64a85-9a94-6450-8828-10638dbfcd68', 'What is your name?', 1, 'what_is_your_favorite_color.wav');

INSERT INTO qa_question 
(uuid, phrase, sequence, audio_file) VALUES ('1ef656ad-d408-6fa0-b1cc-3e00db43cf8f', 'What is your quest?', 2, 'demo.mp3');

INSERT INTO qa_question 
(uuid, phrase, sequence, audio_file) VALUES ('1ef64a86-9a94-6450-8828-10638dbfcd68', 'What is your favorite color?', 3, 'what_is_your_favorite_color.wav');

INSERT INTO qa_question 
(uuid, phrase, sequence, audio_file) VALUES ('1ef66123-d408-6fa0-b1cc-3e00db43cf8f', 'What... is the capital of Assyria? ', 4, 'demo.mp3');
