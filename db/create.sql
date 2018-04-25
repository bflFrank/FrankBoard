create table if not exists users(
    idUser integer primary key asc,
    studentID integer,
    username text,
    password text,
    salt text,
    first text,
    last text,
    userLevel integer default 2
);

insert into users (idUser, studentID, username, password, salt, first, last, userLevel) values
    (null, 11111, "user1", "e172c5654dbc12d78ce1850a4f7956ba6e5a3d2ac40f0925fc6d691ebb54f6bf", "user", "frank", "orechio", 2);
insert into users (idUser, studentID, username, password, salt, first, last, userLevel) values
    (null, 22222, "user2", "e172c5654dbc12d78ce1850a4f7956ba6e5a3d2ac40f0925fc6d691ebb54f6bf", "user", "emeli", "garcia", 2);
insert into users (idUser, studentID, username, password, salt, first, last, userLevel) values
    (null, 33333, "user3", "e172c5654dbc12d78ce1850a4f7956ba6e5a3d2ac40f0925fc6d691ebb54f6bf", "user", "manny", "soto", 2);
insert into users (idUser, studentID, username, password, salt, first, last, userLevel) values
    (null, 44444, "user4", "e172c5654dbc12d78ce1850a4f7956ba6e5a3d2ac40f0925fc6d691ebb54f6bf", "user", "moises", "nunez", 2);

insert into users (idUser, username, password, salt, first, last, userLevel) values
    (null, "admin", "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892", "admin", "admin", "administrator", 1);

create table if not exists courses(
    idCourse integer primary key asc,
    subject text,
    code integer,
    name text,
    days text,
    room text,
    crn integer
);
create table if not exists registration(
    idRegistration integer primary key asc,
    idUser integer,
    idCourse integer
);
create table if not exists grades(
    idGrade integer primary key asc,
    idUser integer,
    idCourse integer,
    name text,
    grade real
);
