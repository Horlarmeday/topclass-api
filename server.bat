echo "--------------------------"
echo "Starting server..."
cd ..
pm2 reload ecosystem.config.js
echo "--------------------------"