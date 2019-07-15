<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$config['db']['host']   = 'localhost';
$config['db']['user']   = 'root';
$config['db']['pass']   = '';
$config['db']['dbname'] = 'testdb';

$app = new \Slim\App(['settings' => $config]);

$container = $app->getContainer();

$container['db'] = function ($container) {
    $db = $container['settings']['db'];
    $pdo = new PDO('mysql:host=' . $db['host'] . ';dbname=' . $db['dbname'],
        $db['user'], $db['pass']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::MYSQL_ATTR_INIT_COMMAND, 'SET NAMES utf8');
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
};

$app->get('/api/accords', function (Request $request, Response $response, array $args) {
    $sql = 'SELECT * FROM `accord`';
    /** @var PDOStatement $statement */
    $statement = $this->db->prepare($sql);
    $statement->execute();

    return $response->withJson($statement->fetchAll());
});

$app->get('/api/accord/{id}', function (Request $request, Response $response, array $args) {
    $sql = 'SELECT * FROM `accord` WHERE `id_accord` = ?';
    /** @var PDOStatement $statement */
    $statement = $this->db->prepare($sql);
    $statement->execute([$args['id']]);

    return $response->withJson($statement->fetch());
});

$app->post('/api/accord', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();

    $sql = 'SELECT MAX(`sort`) AS max_sort FROM `accord` WHERE `group` = ?';
    /** @var PDOStatement $statement */
    $statement = $this->db->prepare($sql);
    $statement->execute([$data['group']]);
    $sort = (int) $statement->fetch()['max_sort'];
    $sort++;

    $sql = 'INSERT INTO `accord` (`group`, `name`, `sort`, `render_data`) VALUES (?,?,?,?)';
    /** @var PDOStatement $statement */
    $statement = $this->db->prepare($sql);
    $result = $statement->execute([$data['group'], $data['name'], $sort, json_encode($data['render_data'])]);

    return $response->withJson(['result' => (int) $result]);
});

$app->put('/api/accord/{id}', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();

    $sql = 'UPDATE `accord` SET `group` = ?, `name` = ?, `sort` = ?, `render_data` = ? WHERE `id_accord` = ?';
    /** @var PDOStatement $statement */
    $statement = $this->db->prepare($sql);
    $result = $statement->execute([$data['group'], $data['name'], $data['sort'], json_encode($data['render_data']), $args['id']]);

    return $response->withJson(['result' => (int) $result]);
});

$app->delete('/api/accord/{id}', function (Request $request, Response $response, array $args) {
    $sql = 'DELETE FROM `accord` WHERE `id_accord` = ?';
    /** @var PDOStatement $statement */
    $statement = $this->db->prepare($sql);
    $statement->execute([$args['id']]);

    return $response->withJson($statement->fetch());
});

$app->run();
