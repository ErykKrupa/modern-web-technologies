<?php
$path = 'visits';

$file  = fopen( $path, 'r' );
$count = fgets( $file, 1000 );
fclose( $file );

if (!isset($_COOKIE["visited"])) {
    $count = abs( intval( $count ) ) + 1;
    $file = fopen( $path, 'w' );
    fwrite( $file, $count );
    fclose( $file );
    setcookie("visited", true, time() + 86_400);
}
