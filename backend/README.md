# Dashboard Backend

The backend folder contains the Node.js/Express backend for the admin dashboard assignment. It connects to a MongoDB database and exposes simple REST endpoints for authentication, user management, and metrics.  

This service uses the built-in `fetch` API available in Node 18+ (no extra HTTP library required).
## Setup

1. **Install dependencies**

   ```bash
   cd backend
   npm install
   ```

2. **Create a `.env` file** in the `backend` directory with the following keys (adjust values as needed):

   ```env
   # you can either provide full URI or build it from components below
   # MONGO_URI=mongodb://localhost:27017/dashboard

   # alternative component-based variables (use one style or the other)
   MONGO_HOST=localhost
   MONGO_PORT=27017
   # note: the database name is always "dashboard"; the code will ignore
   # any other value to ensure data is stored in the required database.
   # -> optional credentials if you secure the database:
   # MONGO_USER=admin
   # MONGO_PASS=s3cr3t

   JWT_SECRET=your_jwt_secret_here
   PORT=3000
   ```

   The connection helper in `config/db.js` will assemble the URI automatically.  
   Example generated URIs:

   - `mongodb://localhost:27017/dashboard`
   - `mongodb://admin:password@localhost:27017/dashboard?authSource=admin`

   If you deploy to MongoDB Atlas or another host, simply set `MONGO_URI` directly.

3. **Start the server**
   ```bash
   npm run dev   # uses nodemon
   # or
   npm start
   ```

The API will be available at `http://localhost:3000/api`.

### Endpoints

| Path             | Method   | Description                 | Access  |
| ---------------- | -------- | --------------------------- | ------- |
| `/auth/register` | POST     | Create a new user           | public  |
| `/auth/login`    | POST     | Authenticate and obtain JWT | public  |
| `/users`         | GET      | List users (no passwords)   | private |
| `/metrics`       | GET/POST | Retrieve/add metrics        | private |

Add token to `x-auth-token` header for private routes.

## Viewing data with MongoDB Compass

You can inspect the running database using [MongoDB Compass](https://www.mongodb.com/products/compass).

1. Start your MongoDB server (local `mongod` or Atlas cluster).
2. Open Compass and paste the connection string used by the app (e.g. `mongodb://localhost:27017/dashboard`).
3. If you supplied `MONGO_USER`/`MONGO_PASS`, include them in the URI or set them in the authentication fields.
4. Connect and browse collections such as `users` and `metrics`; new documents appear when you register or post metrics from the API.

## Seeding metrics with Mockaroo

A convenience route is provided to populate the database with synthetic analytics data:

```bash
# create N records (default 50)
curl -X GET 'http://localhost:3000/api/metrics/seed?count=100' \
     -H "x-auth-token: <your_jwt>"
```

If you have a [Mockaroo](https://www.mockaroo.com) account you can set `MOCKAROO_KEY`
in `.env` and point the seed route to one of your schemas. The code will fetch data
from the Mockaroo API, otherwise it will randomly generate simple "sales" metrics.

Add to `.env`:

```env
MOCKAROO_KEY=YOUR_API_KEY_HERE
```

Replace `your_schema` in `routes/metrics.js` with the ID of your schema, or leave
as-is to use the fallback generator.
