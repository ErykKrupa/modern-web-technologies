<?php

$username = $_POST["username"];
$password = hash("sha256", $_POST["password"]);

$db = new PDO('sqlite:./app.db');

$result = $db->query("insert into users (username, password) values (\"$username\" , \"$password\");");

header("Location: index.php");
