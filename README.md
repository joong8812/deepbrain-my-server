# Express server

## 1W
* response now time to client
* response only 10 camping site data to client

## 2W
### make campsite CRUD / restful api
* `GET`, `/campsites` - read all campsites
* `POST`, `/campsites` - create a campsite
* `GET`, `/campsites/:id` - read a specific campsite
* `PATCH`, `/campsites/:id` - update a specific campsite
* `DELETE`, `/campsites/:id` - delete a speicific campsite

## 3W
### make signup, login, logout api
* `POST`, `/user/signup` - sign up
* `POST`, `/user/login` - login
* `GET`, `/user/logout` - logout

## How to run this server
1. Clone this project
```shell
$git clone https://github.com/joong8812/deepbrain-my-server.git
```
2. Install package which it uses
```shell
$npm install
```
3. Run the server
```shell
$node server
```
## It needs mongodb
You can install mongodb server through Docker. (You should [install Docker](https://www.docker.com/products/docker-desktop/) first)
```shell
$docker pull mongo
$docker run –name mongo -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root -d -p 27017:27017 mongo
```
