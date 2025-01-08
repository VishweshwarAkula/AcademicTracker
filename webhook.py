from flask import Flask, request, jsonify  # type: ignore
import subprocess
import os

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    if request.method == 'POST':
        try:
            # Parse the request JSON
            req = request.get_json()
            if req is None:
                return jsonify({'fulfillmentText': 'No data received from Dialogflow.'})

            user_input = req.get('queryResult', {}).get('queryText', None)
            if user_input is None:
                return jsonify({'fulfillmentText': 'Invalid request format.'})

            # Ensure the C++ executable exists
            cpp_executable = 'compute.exe'  # Update if your C++ file is different
            if not os.path.isfile(cpp_executable):
                return jsonify({'fulfillmentText': 'C++ executable not found.'})

            # Call the C++ program with the user input
            process = subprocess.Popen(
                [cpp_executable, user_input],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            stdout, stderr = process.communicate()

            # Handle errors during execution
            if process.returncode != 0:
                error_message = stderr.decode('utf-8').strip()
                return jsonify({'fulfillmentText': f'Error in computation: {error_message}'})

            # Process the output from the C++ program
            result = stdout.decode('utf-8').strip()
            return jsonify({'fulfillmentText': result})

        except KeyError:
            return jsonify({'fulfillmentText': 'Invalid request structure. Please check the input.'})
        except Exception as e:
            return jsonify({'fulfillmentText': f'An error occurred: {str(e)}'})

    # Method not allowed if not POST
    return jsonify({'fulfillmentText': 'Method not allowed.'}), 405

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
