from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return """
    <html>
        <head><title>Studio Queral - Test</title></head>
        <body>
            <h1>🎉 Serverless Function Works!</h1>
            <p>This is a simple test to verify our Vercel setup is working.</p>
            <p>If you can see this, the basic Flask serverless function is operational.</p>
        </body>
    </html>
    """

@app.route('/debug')
def debug():
    import sys
    import os
    return f"""
    <html>
        <head><title>Debug Info</title></head>
        <body>
            <h1>Debug Information</h1>
            <h2>Python Path:</h2>
            <ul>
                {''.join([f'<li>{path}</li>' for path in sys.path])}
            </ul>
            <h2>Current Working Directory:</h2>
            <p>{os.getcwd()}</p>
            <h2>Environment:</h2>
            <ul>
                <li>Python Version: {sys.version}</li>
                <li>File Location: {__file__}</li>
            </ul>
        </body>
    </html>
    """ 