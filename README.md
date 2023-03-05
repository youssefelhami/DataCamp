
# DataCamp

This project is for my security Coursework submition, and is a basic web application that allows user to upload campgrounds and their description and post reviews on their experiences

The DataCamp web application uses a client-server architecture where the front end is built using ReactJS and the back end is built using Django. The application stores data in a SQLite database.




## Back-End Execution

To activate the back end, go to the backend folder and execute the command bellow.

```bash
  python3 -m venv venv
```

then execute the command:

```bash
  source venv/bin/activate
```

then execute the command:

```bash
  Pip3 install -r requirements.txt
```

And finally execute the command:

```bash
  python3 manage.py runserver
```


## Front-End Execution

To activate the front end, go to the client folder on a separate terminal and execute the command bellow.

```bash
  yarn install
```

And then use 

```bash
  yarn start
```