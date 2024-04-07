FROM node:21-alpine3.18 as react-builder
WORKDIR /app
COPY frontend/ ./
RUN yarn install
RUN yarn run build

# Builder stage for Rust Backend
FROM rust:1.77-buster as rust-builder
WORKDIR /usr/src/myapp
COPY backend/ ./
ENV SQLX_OFFLINE=true
RUN cargo build --release

# Final stage: Copy both the frontend and backend build artifacts into one image
FROM debian:buster-slim

RUN apt-get update \
    && apt-get install -y openssl \
    && rm -rf /var/lib/apt/lists/*

# Copy the Rust binary
COPY --from=rust-builder /usr/src/myapp/target/release/backend /usr/local/bin/backend
# Copy the React app build to the directory served by your Rust application
COPY --from=react-builder /app/build /usr/local/bin/build

WORKDIR /usr/local/bin
# Set the command to run your Rust application
ENTRYPOINT [ "./backend" ]
