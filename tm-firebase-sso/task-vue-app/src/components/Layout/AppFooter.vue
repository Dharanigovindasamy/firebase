    <template>
    <footer class="footer">
        <div class="footer-container">
            <!-- <img src="@/assets/task1.png" alt="Task Management Logo" class="footer-logo" /> -->
            <p class="footer-text">Task Management © 2025</p>
        </div>
    </footer>
    </template>

    <script setup>
    // no script needed for simple footer
    </script>

    <style scoped>
    .footer {
    background-color: #0b0b0b;
    color: #ffffff;
    padding: 20px 0;
    margin-top: 100px;
    width: 100%;
    }

    .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    }

    .footer-logo {
    width: 40px;
    height: 40px;
    }

    .footer-text {
    font-size: 16px;
    color: #ffffff;
    align-items: center;
    text-align: center;
    margin-left: 420px;
    }

    .footer-right {
    display: flex;
    gap: 20px;
    }

    .footer-link {
    color: #ffffff;
    text-decoration: none;
    font-size: 16px;
    transition: color 0.3s ease;
    }

    .footer-link:hover {
    color: #00bfff;
    }
    </style>
