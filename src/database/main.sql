CREATE DATABASE IF NOT EXISTS `boommodbs` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `boommodbs`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `categoria` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `categoria`) VALUES
(1, 'ciencia ficcion'),
(2, 'comedia'),
(3, 'terror'),
(4, 'doramas'),
(5, 'infantil'),
(6, 'romance'),
(7, 'misterio'),
(8, 'accion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_peliculas`
--

CREATE TABLE `detalle_peliculas` (
  `id_pelicula` int(11) NOT NULL,
  `id_categ` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_peliculas`
--

INSERT INTO `detalle_peliculas` (`id_pelicula`, `id_categ`) VALUES
(4, 1),
(6, 2),
(9, 2),
(15, 2),
(5, 3),
(11, 3),
(12, 5),
(13, 5),
(14, 5),
(10, 6),
(1, 8),
(2, 8),
(3, 8),
(7, 8),
(8, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritas`
--

CREATE TABLE `favoritas` (
  `id_usuario` int(11) NOT NULL,
  `id_pelicula` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `favoritas`
--

INSERT INTO `favoritas` (`id_usuario`, `id_pelicula`) VALUES
(2, 7),
(2, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_visual`
--

CREATE TABLE `historial_visual` (
  `id_usuario` int(11) NOT NULL,
  `id_pelicula` int(11) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial_visual`
--

INSERT INTO `historial_visual` (`id_usuario`, `id_pelicula`, `fecha`) VALUES
(2, 1, '2024-05-16'),
(2, 2, '2024-05-16'),
(1, 3, '2024-05-16'),
(2, 1, '2024-05-17'),
(1, 4, '2024-05-17'),
(2, 5, '2024-05-17'),
(2, 2, '2024-05-19'),
(2, 5, '2024-05-19'),
(1, 6, '2024-05-19'),
(1, 5, '2024-05-19'),
(2, 6, '2024-05-19'),
(1, 7, '2024-05-19'),
(2, 7, '2024-05-19'),
(2, 6, '2024-05-20'),
(1, 7, '2024-05-20'),
(1, 5, '2024-05-20'),
(1, 8, '2024-05-20'),
(1, 9, '2024-05-20'),
(2, 9, '2024-05-20'),
(1, 10, '2024-05-20'),
(1, 11, '2024-05-20'),
(1, 12, '2024-05-20'),
(1, 13, '2024-05-20'),
(2, 14, '2024-05-20'),
(2, 13, '2024-05-20'),
(2, 7, '2024-05-20'),
(1, 15, '2024-05-20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imgs_peliculas`
--

CREATE TABLE `imgs_peliculas` (
  `id_pelicula` int(11) NOT NULL,
  `url_img` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imgs_peliculas`
--

INSERT INTO `imgs_peliculas` (`id_pelicula`, `url_img`) VALUES
(1, 'http://localhost:3000/resources/imgmovies/lw9i8czk.g7.jpg'),
(2, 'http://localhost:3000/resources/imgmovies/lw9j2ok7.g06.jpg'),
(3, 'http://localhost:3000/resources/imgmovies/lw9k89p8.jfl.jpg'),
(4, 'http://localhost:3000/resources/imgmovies/lwatt374.08k.jpg'),
(5, 'http://localhost:3000/resources/imgmovies/lwb73glg.ri.jpg'),
(6, 'http://localhost:3000/resources/imgmovies/lwehh82u.v2.jpg'),
(7, 'http://localhost:3000/resources/imgmovies/lwehpv60.k6h.jpg'),
(8, 'http://localhost:3000/resources/imgmovies/lwehyy5o.4mr.jpg'),
(9, 'http://localhost:3000/resources/imgmovies/lweiagud.8ob.jpg'),
(10, 'http://localhost:3000/resources/imgmovies/lweijayv.bc.jpg'),
(11, 'http://localhost:3000/resources/imgmovies/lwein02t.w2.jpeg'),
(12, 'http://localhost:3000/resources/imgmovies/lweixym1.w9.jpg'),
(13, 'http://localhost:3000/resources/imgmovies/lwejcbgl.g2e.jpg'),
(14, 'http://localhost:3000/resources/imgmovies/lwejxy96.k.jpeg'),
(15, 'http://localhost:3000/resources/imgmovies/lwfea2qo.d0m.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `otp`
--

CREATE TABLE `otp` (
  `id` int(11) NOT NULL,
  `otp` varchar(300) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `estado` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peliculas`
--

CREATE TABLE `peliculas` (
  `id` int(11) NOT NULL,
  `titulo` varchar(300) NOT NULL,
  `director` varchar(150) NOT NULL,
  `lanz` date NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  `img_portada` varchar(700) NOT NULL,
  `url` varchar(700) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `peliculas`
--

INSERT INTO `peliculas` (`id`, `titulo`, `director`, `lanz`, `descripcion`, `img_portada`, `url`) VALUES
(1, 'Kizumonogatari I: Tekketsu-hen', 'Nishio Ishin', '2024-05-14', 'El 25 de marzo, durante las vacaciones de primavera, Koyomi Araragi, un estudiante de segundo año de bachillerato, se hace amigo de Tsubasa Hanekawa, la estudiante con mayores honores en su escuela. Tsubasa menciona un rumor acerca de un \"vampiro rubio\" que ha sido avistado en su ciudad recientemente.', 'http://localhost:3000/resources/imgmovies/lw9i8czc.0i.jpg', 'https://www.yourupload.com/embed/b70WT04IVP5R'),
(2, 'Kizumonogatari II: Nekketsu-hen', 'Nishio Ishin', '2019-05-17', 'Koyomi salva a Kiss-shot, quien estaba al borde de la muerte con todas sus cuatro extremidades cortadas, pero solo al costo de convertirse en su sirviente y un vampiro.', 'http://localhost:3000/resources/imgmovies/lw9j2ok2.u68.jpg', 'https://www.yourupload.com/embed/tidS0MYWeO32'),
(3, 'Kizumonogatari III: Reiketsu-hen', 'Nishio Ishin', '2022-05-17', 'La historia cuenta los sucesos que llevaron a Araragi a su encuentro con Shinobu y con Hanekawa y a acabar convertido en vampiro.', 'http://localhost:3000/resources/imgmovies/lw9k89p5.cx.jpg', 'https://www.yourupload.com/embed/6cyhY76PAeAi'),
(4, 'Spiderman 3', 'Sam Raimi', '2004-05-04', 'Peter Parker consigue finalmente un equilibrio entre su devoción por Mary Jane y sus deberes como superhéroe. Pero una tormenta amenaza en el horizonte. Cuando su traje cambia de repente, volviéndose negro y mejorando sus poderes, Peter también se transforma sacando el lado más oscuro y vengativo de su personalidad.', 'http://localhost:3000/resources/imgmovies/lwatt373.1a.jpg', 'https://www.youtube.com/embed/e5wUilOeOmg?si=BAEI78fEU6VT8Uzr'),
(5, 'Feliz día de tu muerte', 'Christopher Landon', '2024-05-22', 'Una estudiante de universidad debe revivir su propio asesinato día tras día hasta que descubra la identidad de su asesino.', 'http://localhost:3000/resources/imgmovies/lwb73glh.7bk.jpg', '//ok.ru/videoembed/7559598901974'),
(6, 'Que pasó ayer', 'Todd Phillips', '2009-08-14', 'Doug y Tracy Garner están a punto de casarse. Todo es emoción y un par de días antes de la boda no paran los preparativos. Pero Doug, sus amigos Phil (Bradley Cooper) y Stu (Ed Helms), y su cuñado Alan (Zach Galifianakis) deciden irse a celebrar el fin de la soltería del novio a Las Vegas. Los hombres se escapan en el Mercedes Benz convertible del suegro dispuestos a pasar las mejores 24 horas de su vida. Tras una noche de fiesta salvaje, tres de los amigos despiertan en su hotel sin recordar absolutamente nada de lo que pasó. La habitación está hecha un completo desastre, en ella hay un bebé y un tigre encadenado. Además, Doug ha desaparecido. Desesperados, Phil, Stu y Alan intentan unir sus escasos recuerdos para dar con el novio y contener a una desesperada, angustiada y muy enfadada Tracy…', 'http://localhost:3000/resources/imgmovies/lwehh82z.udt.jpg', 'https://www.tokyvideo.com/embed/474659\" frameborder=\"0\" width=\"640\" height=\"360\" scrolling=\"no\" allowfullscreen webkitallowfullscreen mozallowfullscreen allowtransparency style=\"display:block;max-width:100%;margin:0 auto 10px\"></iframe><p style=\"text-align:center;max-width:100%;width:640px;margin:0 auto;font-size:14px\"><a href=\"https://www.tokyvideo.com/video/que-paso-ayer-pelicula-en-latino?utm_campaign=embed&utm_medium=embed-link&utm_source=embed-link\" target=\"_blank\">Qué pasó ayer | Película En Latino</a> by <a href=\"https://www.tokyvideo.com?utm_campaign=embed&utm_medium=embed-home&utm_source=embed-link\" target=\"_blank'),
(7, 'Kick Ass', 'Matthew Vaughn', '2010-06-04', 'Dave Lizewski no parece encajar con sus compañeros de instituto. Sus únicos amigos son los cómics así que un buen día toma una importante decisión: convertirse en superhéroe y salvador de la humanidad. Gracias a un traje de buzo amarillo y verde consigue ser toda una revelación en la sociedad a pesar de no tener ningún poder especial ni tener ningún entrenamiento específico.', 'http://localhost:3000/resources/imgmovies/lwehpv5x.vxu.jpeg', '//ok.ru/videoembed/7265382632180'),
(8, 'Kick Ass 2', 'Jeff Wadlow', '2013-08-30', 'El director Jeff Wadlow (\'Rompiendo las reglas\') dirige esta película basada en el cómic del escritor Mark Millar. La segunda parte del cómic, tiene lugar un año después de lo ocurrido en la primera entrega (\'Kick-Ass\'). En esta ocasión Mindy/Hit-Girl (Chloë Moretz, \'Sombras tenebrosas\') intentará retirarse del grupo de superhérores debido a que Marcus, su padre adoptivo, quiere que lleve una vida normal.', 'http://localhost:3000/resources/imgmovies/lwehyy5m.pef.jpg', '//ok.ru/videoembed/3612554562165'),
(9, 'Que pasó ayer 2', 'Todd Phillips', '2011-05-19', 'Phil (Bradley Cooper), Alan (Zach Galifianakis) y Doug (Justin Bartha) viajan a la exótica Tailandia para asistir a la boda de Stu (Ed Helms). Después de la inolvidable despedida de soltero en Las Vegas, Stu no quiere asumir ningún riesgo y ha decidido ofrecer un almuerzo tranquilo y contenido antes de la boda. No obstante, las cosas no siempre salen como está previsto. Quizás lo que ocurre en Las Vegas se queda en Las Vegas, pero uno ni siquiera puede imaginar lo que sucederá en Bangkok', 'http://localhost:3000/resources/imgmovies/lweiagua.2vs.jpg', '//ok.ru/videoembed/7949999999564'),
(10, 'La idea de ti', 'Michael Showalter', '2024-05-02', 'La idea de tenerte se centra en Sophie, una madre divorciada de 40 años. Su ex marido Dan la dejó por una mujer más joven y después canceló su viaje a Coachella con su hija de 15 años. Ahora, con el fin de cerrar esta dolorosa herida y olvidar durante un tiempo, será ella la que vaya a vivir la experiencia del festival más popular del mundo junto a su hija adolescente. Allí, conoce a Hayes Campbell, un cantante de 24 años, líder de una de las bandas musicales más populares del planeta: August Moon.', 'http://localhost:3000/resources/imgmovies/lweijayt.nts.jpg', '//ok.ru/videoembed/6853307730526'),
(11, 'Destino Final 4', 'David R. Ellis', '2009-09-11', 'Un grupo de amigos acude a un circuito de carreras para ver una prueba del Nascar. Durante la carrera, Nick, uno de los chicos, tiene una premonición sobre un accidente y saca a sus amigos del recinto para escapar de la tragedia. El accidente acaba ocurriendo y todos celebran el hecho de estar vivos. Sin embargo, el grupo no ha desafiado del todo a la muerte, que volverá para llevarse a los supervivientes de la manera más brutal posible.', 'http://localhost:3000/resources/imgmovies/lwein02m.q5m.jpg', '//ok.ru/videoembed/5379614575317'),
(12, 'Elemental', 'Peter Sohn', '2023-07-14', 'Película de animación que nos traslada a Ciudad Elemento, una urbe cuyos habitantes son seres hechos de aire, tierra, agua y fuego. Allí conviven estos cuatro tipos de elementos, con una única regla que es imprescindible cumplir: los elementos no pueden mezclarse. Cuando Candela, una joven de fuego, conoce a Nilo, un joven de agua, las cosas van a ponerse patas arriba. Ella vive en barrio fuego, a toda mecha, con su llameante familia que ya tiene muy claro cuáles son los planes para la joven: seguir los pasos de su padre. Pero, ¿qué pasará cuando Candela quiera vivir fuera de su elemento? ¿Y si el fuego y el agua se enamoraran? ¿Será un amor imposible o el inicio de una gran amistad? Lo que Candela y Nilo están a punto de descubrir es algo elemental: realmente tienen muchas cosas en común.', 'http://localhost:3000/resources/imgmovies/lweixym4.i5e.jpg', '//ok.ru/videoembed/7607637117654'),
(13, 'Siempre a tu lado. Hachiko', 'Lasse Hallström', '2009-11-06', 'Parker Wilson (Richard Gere, \'El caso Wells\') es un profesor de universidad que trabaja lejos de su casa. Todos los días se acerca a la estación de tren para trasladarse a su oficio. No obstante, un día en el que regresa del trabajo, encuentra en la estación de tren un perro, aún cachorro, de la raza akita. Sin saber con quién dejar al animal, decide llevárselo a su casa aun sabiendo que su esposa no quiere tener animales en casa. Con el paso del tiempo, Parker y \"Hachi\", su nueva mascota, se terminan haciendo inseparables, acompañando el perro a su dueño en todas las tareas de casa. Tanto es el grado en el que se quieren que Hachi, al crecer, termina yendo a buscar a su dueño cada día a la estación de tren, ya que le echa de menos. Sin embargo, un inesperado acontecimiento, termina cambiando de nuevo sus vidas.', 'http://localhost:3000/resources/imgmovies/lwejcbgp.nwm.jpg', '//ok.ru/videoembed/6533900733093'),
(14, 'Nimona', 'Troy Quane, Nick Bruno', '2023-06-14', 'Un caballero acusado de un trágico crimen se alía con una audaz adolescente con poderes metamórficos para probar su inocencia. Se cuestiona si ella es el monstruo al que juró destruir.', 'http://localhost:3000/resources/imgmovies/lwejxy8y.95.jpeg', '//ok.ru/videoembed/6307087321694'),
(15, 'TED', 'Seth MacFarlane', '2012-08-10', 'Cuando John Bennett (Mark Wahlberg) era pequeño, deseaba que su osito de peluche Ted fuera un oso de verdad y, por desgracia, su sueño se hizo realidad. Más de veinte años después, Ted sigue con John y saca de quicio a su novia Lori, que empieza a perder la paciencia. Para colmo, a John no parece preocuparle su futuro profesional y se pasa la vida fumando porros con Ted. A pesar de ello, John intenta alcanzar la madurez, pero parece que para conseguirlo le resulta indispensable la ayuda de Ted.', 'http://localhost:3000/resources/imgmovies/lwfea2qi.h5.jpg', '//ok.ru/videoembed/2494320413343');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `rol` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `rol`) VALUES
(1, 'admin'),
(2, 'usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(300) NOT NULL,
  `contrasenia` varchar(400) NOT NULL,
  `correo` varchar(400) NOT NULL,
  `id_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `contrasenia`, `correo`, `id_rol`) VALUES
(1, 'admin', '$2a$09$uNcI68Nqzay6Vyk5DVMuE.BcZYCuqK5Q1m9CKJtMnXF8jDW.i3/Ou', 'admin@admin.com', 1),
(2, '7ven', '$2a$09$gKrPH7akWGzJqhdnmyHXYuslkpaedvvpGpvcMIV.xqVAJcK92wt8C', 'alexnvdz@gmail.com', 2),
(3, 'luis.vilaro', '$2a$09$rSlyro3CYn6tXc50ni8KvudtJQV/.joe/EPmvCDfKUioMnrywqYvW', 'vilaroramosluisfernando17@gmail.com', 2),
(4, 'rappiprime', '$2a$09$5f7A87j6QUV.yzJHYe1QOeaN7WSCDmNDxAZFOx86uTjju0U5TiRzC', 'pararappiprimerappi@gmail.com', 2),
(5, 'JoseMa', '$2a$09$0AiV0X.UCcslYT0laWofauVuAzGxn3jv.68r6mA2ep5Txr.OU3XAq', 'pgema249@gmail.com', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalle_peliculas`
--
ALTER TABLE `detalle_peliculas`
  ADD PRIMARY KEY (`id_pelicula`),
  ADD KEY `id_categ` (`id_categ`);

--
-- Indices de la tabla `favoritas`
--
ALTER TABLE `favoritas`
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_pelicula` (`id_pelicula`);

--
-- Indices de la tabla `historial_visual`
--
ALTER TABLE `historial_visual`
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_pelicula` (`id_pelicula`);

--
-- Indices de la tabla `imgs_peliculas`
--
ALTER TABLE `imgs_peliculas`
  ADD KEY `id_pelicula` (`id_pelicula`);

--
-- Indices de la tabla `otp`
--
ALTER TABLE `otp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_rol` (`id_rol`),
  ADD KEY `idx_user` (`usuario`),
  ADD KEY `idx_user_email` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `detalle_peliculas`
--
ALTER TABLE `detalle_peliculas`
  MODIFY `id_pelicula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `otp`
--
ALTER TABLE `otp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_peliculas`
--
ALTER TABLE `detalle_peliculas`
  ADD CONSTRAINT `detalle_peliculas_ibfk_1` FOREIGN KEY (`id_categ`) REFERENCES `categorias` (`id`);

--
-- Filtros para la tabla `favoritas`
--
ALTER TABLE `favoritas`
  ADD CONSTRAINT `favoritas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `favoritas_ibfk_2` FOREIGN KEY (`id_pelicula`) REFERENCES `peliculas` (`id`);

--
-- Filtros para la tabla `historial_visual`
--
ALTER TABLE `historial_visual`
  ADD CONSTRAINT `historial_visual_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `historial_visual_ibfk_2` FOREIGN KEY (`id_pelicula`) REFERENCES `peliculas` (`id`);

--
-- Filtros para la tabla `imgs_peliculas`
--
ALTER TABLE `imgs_peliculas`
  ADD CONSTRAINT `imgs_peliculas_ibfk_1` FOREIGN KEY (`id_pelicula`) REFERENCES `peliculas` (`id`);

--
-- Filtros para la tabla `otp`
--
ALTER TABLE `otp`
  ADD CONSTRAINT `otp_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`);
COMMIT;
