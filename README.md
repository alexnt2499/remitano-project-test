# FULLSTACK BACKEND + FRONTEND

This is Home Test of Remitano for Fullstack developer.

## Tech stack:

- Backend: Ruby, Ruby on rails.
- Frontend: ReactJS, Typescript.

## Prerequisites:

Application requires [Ruby] v3.0.0, [Redis] v7.0.1, [Rails] v7.0.4 to run.

```rb
#Ruby version
ruby "3.0.0"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.0.4", ">= 7.0.4.3"

# Use sqlite3 as the database for Active Record
gem "sqlite3", "~> 1.4"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", "~> 5.0"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]
# Reduces boot times through caching; required in config/boot.rb

gem "bootsnap", require: false

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem "rack-cors"

# Use bcrypt for password hashing and authentication.
gem 'bcrypt', '~> 3.1.7'

# Use jwt token for authentication.
gem 'jwt'

# Use simple command for authentication.
gem 'simple_command'

# Use email validator
gem 'email_validator'

# Use pagination
gem 'will_paginate', '~> 3.1.0'

# Use for Jobs and Background processing
gem 'sidekiq'
gem 'redis'

```

## Installation & Configuration

[ENV_DEVELOPMENT]

```sh
redis-server

bundle install

rails db:migrate

spring binstub --all

rerun rails server


```

[PRODUCTION_DEVELOPMENT]

```sh
redis-server

bundle install

rails db:migrate

spring binstub --all

bin/rails s -e production


```

## Database Setup

- Because this is test so I use sqlite3.

[FOR_MAC]

```sh
brew install sqlite3


```

[FOR_LINUX]

```sh
sudo apt update
sudo apt install sqlite3

```

[FOR_WINDOW]

Step 1 − Go to SQLite download page, and download precompiled binaries from Windows section.

Step 2 − Download sqlite-shell-win32-_.zip and sqlite-dll-win32-_.zip zipped files.

Step 3 − Create a folder C:\>sqlite and unzip above two zipped files in this folder, which will give you sqlite3.def, sqlite3.dll and sqlite3.exe files.

Step 4 − Add C:\>sqlite in your PATH environment variable and finally go to the command prompt and issue sqlite3 command, which should display the following result.
