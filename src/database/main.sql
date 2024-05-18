CREATE DATABASE IF NOT EXISTS `boommodbs` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE `boommodbs`;


CREATE TABLE `peliculas` (
    `id` INT PRIMARY KEY auto_increment,
    `titulo` varchar(300) NOT NULL,
    `director` varchar(150) NOT NULL,
    `lanz` DATE NOT NULL,
    `descripcion` varchar(1000) NOT NULL,
    `img_portada` VARCHAR(700) NOT NULL,
    `url` varchar(700) NOT NULL
);

CREATE TABLE `categorias` (
    `id` INT PRIMARY KEY auto_increment,
    `categoria` varchar(500) NOT NULL
);

CREATE TABLE `detalle_peliculas` (
    `id_pelicula` INT PRIMARY KEY auto_increment,
    `id_categ` INT NOT NULL,
    Foreign Key (id_categ) REFERENCES categorias(id)
);


CREATE TABLE `imgs_peliculas` (
    `id_pelicula` INT NOT NULL,
    `url_img` varchar(300) NOT NULL,
    Foreign Key (id_pelicula) REFERENCES peliculas(id)
);

CREATE TABLE `roles` (
    `id` INT PRIMARY KEY auto_increment,
    `rol` varchar(300) NOT NULL
);

CREATE TABLE `usuarios` (
    `id` INT PRIMARY KEY auto_increment,
    `usuario` varchar(300) NOT NULL,
    `contrasenia` varchar(400) NOT NULL,
    `correo` VARCHAR(400) NOT NULL,
    `id_rol` INT NOT NULL,
    Foreign Key (id_rol) REFERENCES roles(id)
);

CREATE TABLE `otp` (
    `id` INT PRIMARY KEY auto_increment,
    `otp` varchar(300) NOT NULL,
    `id_usuario` INT NOT NULL,
    `estado` VARCHAR(400) NOT NULL,
    Foreign Key (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE `favoritas` (
    `id_usuario` INT NOT NULL,
    `id_pelicula` INT NOT NULL,
    Foreign Key (id_usuario) REFERENCES usuarios(id),
    Foreign Key (id_pelicula) REFERENCES peliculas(id)
);

CREATE TABLE `historial_visual` (
    `id_usuario` INT NOT NULL,
    `id_pelicula` INT NOT NULL,
    `fecha` DATE NOT NULL,
    Foreign Key (id_usuario) REFERENCES usuarios(id),
    Foreign Key (id_pelicula) REFERENCES peliculas(id)
);



INSERT INTO `roles` 
(rol) VALUES("admin"),
("usuario");
INSERT INTO `usuarios`(usuario,contrasenia,correo,id_rol)
 VALUES("admin","$2a$09$uNcI68Nqzay6Vyk5DVMuE.BcZYCuqK5Q1m9CKJtMnXF8jDW.i3/Ou","admin@admin.com",1);

ALTER TABLE `usuarios`
ADD INDEX `idx_user` (usuario);

ALTER TABLE `usuarios`
ADD INDEX `idx_user_email` (correo);

INSERT INTO `categorias` (`id`, `categoria`) VALUES
(1, 'ciencia ficcion'),
(2, 'comedia'),
(3, 'terror'),
(4, 'doramas'),
(5, 'infantil'),
(6, 'romance'),
(7, 'misterio'),
(8, 'accion');


INSERT INTO `peliculas` (`id`, `titulo`, `lanz`, `descripcion`, `img_portada`, `url`, `director`) VALUES
(1, 'Guardianes de la galaxia vol. 1', '2014-04-12', 'El temerario aventurero Peter Quill es objeto de un implacable cazarrecompensas después de robar una misteriosa esfera codiciada por Ronan, un poderoso villano cuya ambición amenaza todo el universo. Para poder escapar del incansable Ronan, Quill se ve obligado a pactar una complicada tregua con un cuarteto de disparatados inadaptados: Rocket, un mapache armado con un rifle, Groot, un humanoide con forma de árbol, la letal y enigmática Gamora y el vengativo Drax the Destroyer. Pero cuando Quill descubre el verdadero poder de la esfera, deberá hacer todo lo posible para derrotar a sus extravagantes rivales en un intento desesperado de salvar el destino de la galaxia. (FILMAFFINITY)', 'http://localhost:3000/resources/imgmovies/lvx7rdw1.gmn.jpeg', 'https://www.youtube.com/embed/d96cjJhvlMA?si=u-xgve0iOuXct6yO', 'Joe Ruso'),
(2, 'Chicos buenos', '2019-08-16', 'Después de ser invitados a su primera \"fiesta del beso\", tres buenos amigos (Jacob Tremblay, Keith L. Williams y Brady Noon) destrozan por casualidad un dron que tenían prohibido tocar. Para reemplazarlo, se ausentan de clase y toman una serie de decisiones erróneas, involucrándose en un caso que incluye drogas y policía.', 'http://localhost:3000/resources/imgmovies/lw03y8xu.z7j.jpeg', 'https://www.youtube.com/embed/J3lWVwLrTIA?si=2NFkTcsrafXRFZEo', 'Gene Stupnitsky'),
(3, 'Fallout', '2024-02-10', 'Basado en una de las mejores series de videojuegos de todos los tiempos, Fallout es la historia de los que tienen y los que no tienen en un mundo en el que ya casi no queda nada que tener. 200 años después del apocalipsis, los amables habitantes de los lujosos refugios nucleares se ven obligados a regresar al infierno irradiado que sus antepasados dejaron atrás y se sorprenden al descubrir un universo increíblemente complejo, alegremente extraño y altamente violento esperándolos.', 'http://localhost:3000/resources/imgmovies/lw047mja.by.jpeg', 'https://www.youtube.com/embed/V-mugKDQDlg?si=sNDc2_OTPB8rhm7k', 'Geneva Robertson-Dworet'),
(4, 'La monja II', '2023-02-23', '1956 – Francia. Un sacerdote es asesinado. Un mal se está extendiendo. La hermana Irene una vez más se encuentra cara a cara con Valak, la monja demonio.', 'http://localhost:3000/resources/imgmovies/lw04glzo.7g.jpeg', 'https://www.youtube.com/embed/Em7wEqLzDnE?si=NgyqXZThSYoMMuib', 'Michael Chaves');


INSERT INTO `imgs_peliculas` (`id_pelicula`, `url_img`) VALUES
(1, 'http://localhost:3000/resources/imgmovies/lvx7rdw5.npo.jpeg'),
(1, 'http://localhost:3000/resources/imgmovies/lvx7rdw7.dcb.jpeg'),
(1, 'http://localhost:3000/resources/imgmovies/lvx7rdw7.34.jpeg'),
(2, 'http://localhost:3000/resources/imgmovies/lw03y8xu.wip.jpeg'),
(2, 'http://localhost:3000/resources/imgmovies/lw03y8xq.fpq.jpeg'),
(2, 'http://localhost:3000/resources/imgmovies/lw03y8xq.jpeg'),
(3, 'http://localhost:3000/resources/imgmovies/lw047mje.3j.jpeg'),
(3, 'http://localhost:3000/resources/imgmovies/lw047mjk.q8.jpeg'),
(4, 'http://localhost:3000/resources/imgmovies/lw04glzu.i88.jpeg'),
(4, 'http://localhost:3000/resources/imgmovies/lw04glzu.awo.jpeg');

INSERT INTO `detalle_peliculas` (`id_pelicula`, `id_categ`) VALUES
(1, 1),
(2, 2),
(4, 3),
(3, 8);



