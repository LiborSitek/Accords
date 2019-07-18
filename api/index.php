<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';
require 'model/AccordMapper.php';

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
    $pdo = new PDO('mysql:host=' . $db['host'] . ';dbname=' . $db['dbname'], $db['user'], $db['pass']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::MYSQL_ATTR_INIT_COMMAND, 'SET NAMES utf8');
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
};

$app->get('/api/accords', function (Request $request, Response $response, array $args) {
    $accordMapper = new AccordMapper($this->db);
    return $response->withJson($accordMapper->findAll());
});

$app->get('/api/accord/{id}', function (Request $request, Response $response, array $args) {
    $accordMapper = new AccordMapper($this->db);
    return $response->withJson($accordMapper->getById($args['id']));
});

$app->post('/api/accord/findByGroupAndType', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();
    $accordMapper = new AccordMapper($this->db);
    return $response->withJson($accordMapper->findByAccordGroupAndType($data['group'], $data['type']));
});

$app->post('/api/accord', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();
    $accordMapper = new AccordMapper($this->db);

    return $response->withJson([
        'result' => (int) $accordMapper->create($data['group'], $data['type'], json_encode($data['render_data']))
    ]);
});

$app->put('/api/accord/{id}', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();
    $accordMapper = new AccordMapper($this->db);

    return $response->withJson([
        'result' => (int) $accordMapper->update($args['id'], $data['group'], $data['type'], $data['sort'], json_encode($data['render_data']))
    ]);
});

$app->delete('/api/accord/{id}', function (Request $request, Response $response, array $args) {
    $accordMapper = new AccordMapper($this->db);
    return $response->withJson(['result' => (int) $accordMapper->delete($args['id'])]);
});

$app->run();
