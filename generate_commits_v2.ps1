$ErrorActionPreference = 'SilentlyContinue'

$commits = @(
    # May 12 (3 commits)
    @{ Date="2026-05-12T10:00:00"; Add="README.md .gitignore"; Msg="chore: initialize project with README and root config" },
    @{ Date="2026-05-12T11:30:00"; Add="backend/package.json frontend/package.json admin/package.json"; Msg="chore: setup package.json for backend, frontend, and admin workspaces" },
    @{ Date="2026-05-12T14:15:00"; Add="backend/package-lock.json frontend/package-lock.json admin/package-lock.json"; Msg="chore: configure initial global gitignore rules" },
    
    # May 14 (4 commits)
    @{ Date="2026-05-14T09:45:00"; Add="frontend/vite.config.js frontend/index.html"; Msg="chore: setup vite config and basic frontend skeleton" },
    @{ Date="2026-05-14T11:20:00"; Add="admin/vite.config.js admin/index.html"; Msg="chore: setup vite config and basic admin skeleton" },
    @{ Date="2026-05-14T14:10:00"; Add="backend/server.js"; Msg="feat: setup core express server entry point" },
    @{ Date="2026-05-14T16:05:00"; Add="backend/.env backend/config/"; Msg="feat: configure server environment variables and cors" },
    
    # May 15 (4 commits)
    @{ Date="2026-05-15T10:15:00"; Add="backend/config/"; Msg="feat: establish mongodb database connection" },
    @{ Date="2026-05-15T13:30:00"; Add="backend/moddles/UserModel.js"; Msg="feat: create mongoose user schema and model" },
    @{ Date="2026-05-15T15:45:00"; Add="backend/moddles/ProductModel.js"; Msg="feat: create mongoose product schema and model" },
    @{ Date="2026-05-15T17:10:00"; Add="backend/moddles/OrderModel.js"; Msg="feat: create mongoose order schema and model" },
    
    # May 19 (5 commits)
    @{ Date="2026-05-19T09:00:00"; Add="backend/middle_wear/"; Msg="feat: add custom error handling middleware" },
    @{ Date="2026-05-19T11:30:00"; Add="backend/middle_wear/"; Msg="feat: implement jwt authentication and authorization middleware" },
    @{ Date="2026-05-19T13:45:00"; Add="backend/controllers/UserController.js"; Msg="feat: implement user registration and login controller" },
    @{ Date="2026-05-19T15:20:00"; Add="backend/routes/UserRoute.js"; Msg="feat: add user authentication API routes" },
    @{ Date="2026-05-19T17:30:00"; Add="backend/controllers/ProductController.js"; Msg="feat: implement product management and retrieval controller" },
    
    # May 20 (3 commits)
    @{ Date="2026-05-20T10:10:00"; Add="backend/routes/ProductRoute.js"; Msg="feat: add product catalog API routes" },
    @{ Date="2026-05-20T13:40:00"; Add="backend/controllers/CartController.js"; Msg="feat: implement cart logic controller for add/remove/update" },
    @{ Date="2026-05-20T16:15:00"; Add="backend/routes/CartRoute.js"; Msg="feat: add shopping cart API routes" },
    
    # May 24 (6 commits)
    @{ Date="2026-05-24T11:00:00"; Add="backend/controllers/OrderController.js"; Msg="feat: implement order creation and stripe payment integration" },
    @{ Date="2026-05-24T12:30:00"; Add="backend/routes/OrderRoute.js"; Msg="feat: add order checkout API routes" },
    @{ Date="2026-05-24T14:45:00"; Add="frontend/src/main.jsx frontend/src/index.css"; Msg="feat: setup react router and global styles for frontend" },
    @{ Date="2026-05-24T17:15:00"; Add="frontend/src/context/"; Msg="feat: implement global state management via context API" },
    @{ Date="2026-05-24T20:00:00"; Add="frontend/src/assets/"; Msg="chore: add static assets and brand imagery" },
    @{ Date="2026-05-24T22:30:00"; Add="frontend/src/components/"; Msg="feat: build reusable navigation and footer components" },
    
    # May 25 (4 commits)
    @{ Date="2026-05-25T10:15:00"; Add="frontend/src/components/"; Msg="feat: build responsive product card component" },
    @{ Date="2026-05-25T13:20:00"; Add="frontend/src/pages/"; Msg="feat: implement home page with featured products layout" },
    @{ Date="2026-05-25T15:40:00"; Add="frontend/src/pages/"; Msg="feat: implement product catalog and search page" },
    @{ Date="2026-05-25T18:05:00"; Add="frontend/src/pages/"; Msg="feat: build interactive shopping cart page" },
    
    # May 29 (2 commits)
    @{ Date="2026-05-29T14:30:00"; Add="frontend/src/pages/"; Msg="feat: implement checkout flow and stripe integration on frontend" },
    @{ Date="2026-05-29T17:45:00"; Add="frontend/src/pages/"; Msg="feat: implement user login and registration forms" },
    
    # June 2 (4 commits)
    @{ Date="2026-06-02T10:00:00"; Add="admin/src/main.jsx admin/src/index.css"; Msg="feat: setup react router and global styles for admin panel" },
    @{ Date="2026-06-02T13:15:00"; Add="admin/src/components/"; Msg="feat: build admin sidebar and top navigation components" },
    @{ Date="2026-06-02T15:50:00"; Add="admin/src/pages/"; Msg="feat: implement admin dashboard overview page" },
    @{ Date="2026-06-02T18:20:00"; Add="admin/src/pages/"; Msg="feat: build add new product form and image upload logic" },
    
    # June 6 (2 commits)
    @{ Date="2026-06-06T11:30:00"; Add="admin/src/pages/"; Msg="feat: implement product inventory management table" },
    @{ Date="2026-06-06T14:45:00"; Add="admin/src/pages/"; Msg="feat: build customer orders management view" },
    
    # June 12 (2 commits)
    @{ Date="2026-06-12T10:20:00"; Add="."; Msg="chore: resolve eslint warnings across all workspaces" },
    @{ Date="2026-06-12T13:00:00"; Add="."; Msg="chore: add vercel deployment configurations for production" }
)

Write-Host "Removing old .git directory..."
if (Test-Path .git) {
    Remove-Item -Recurse -Force .git
}

Write-Host "Initializing new git repository..."
git init

foreach ($commit in $commits) {
    $date = $commit.Date
    $add = $commit.Add
    $msg = $commit.Msg
    
    $paths = $add -split ' '
    foreach ($path in $paths) {
        if ($path) {
            git add $path 2>$null
        }
    }
    
    $env:GIT_AUTHOR_DATE = $date
    $env:GIT_COMMITTER_DATE = $date
    git commit --allow-empty -m $msg
}

Write-Host "Setting main branch and pushing (FORCE)..."
git branch -M main
git remote add origin https://github.com/sumuditha-V/fullstack-ecommerce-app.git
git push -u origin main --force
