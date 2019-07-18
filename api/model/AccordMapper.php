<?php

class AccordMapper
{
    /**
     * @var PDO
     */
    private $connection;

    /**
     * AccordMapper constructor.
     * @param PDO $connection
     */
    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    /**
     * @param int $id
     * @return array
     */
    public function getById($id)
    {
        $sql = 'SELECT * FROM `accord` WHERE `id_accord` = ?';
        $statement = $this->connection->prepare($sql);
        $statement->execute([$id]);
        return $statement->fetch();
    }

    /**
     * @param string $group
     * @param string $type
     * @return array
     */
    public function findByAccordGroupAndType($group, $type)
    {
        $sql = 'SELECT * FROM `accord` WHERE `group` = ? AND `type` = ?';
        $statement = $this->connection->prepare($sql);
        $statement->execute([$group, $type]);
        return $statement->fetchAll();
    }

    /**
     * @return array
     */
    public function findAll()
    {
        $sql = 'SELECT * FROM `accord`';
        $statement = $this->connection->prepare($sql);
        $statement->execute();
        return $statement->fetchAll();
    }

    /**
     * @param string $group
     * @param string $type
     * @param string $renderData
     * @return bool
     */
    public function create($group, $type, $renderData)
    {
        $sql = 'SELECT MAX(`sort`) AS max_sort FROM `accord` WHERE `group` = ?';
        $statement = $this->connection->prepare($sql);
        $statement->execute([$group]);
        $sort = (int) $statement->fetch()['max_sort'];
        $sort++;

        $sql = 'INSERT INTO `accord` (`group`, `type`, `sort`, `render_data`) VALUES (?,?,?,?)';
        $statement = $this->connection->prepare($sql);
        return (bool) $statement->execute([$group, $type, $sort, $renderData]);
    }

    /**
     * @param int $id
     * @param string $group
     * @param string $type
     * @param string $sort
     * @param string $renderData
     * @return bool
     */
    public function update($id, $group, $type, $sort, $renderData)
    {
        $sql = 'UPDATE `accord` SET `group`=?, `type`=?, `sort`=?, `render_data`=? WHERE `id_accord`=?';
        /** @var PDOStatement $statement */
        $statement = $this->connection->prepare($sql);
        return (bool) $statement->execute([$group, $type, $sort, $renderData, $id]);

    }

    /**
     * @param int $id
     * @return bool
     */
    public function delete($id)
    {
        $sql = 'DELETE FROM `accord` WHERE `id_accord`=?';
        $statement = $this->connection->prepare($sql);
        return (bool) $statement->execute([$id]);
    }
}
