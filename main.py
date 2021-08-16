from flask import Flask, render_template, Response, request, redirect, flash, url_for
import math
from graph import graph
# Importing the required Classes/Functions from Modules defined.
from camera import VideoCamera
import threading, queue
from data_normal import normal_score


q = queue.Queue()

def worker():
    while True:
        item = q.get()
        print(f'Working on {item}')
        print(f'Finished {item}')
        q.task_done()

# turn-on the worker thread
threading.Thread(target=worker, daemon=True).start()# Let us Instantiate the app
app = Flask(__name__)


# Flask provides native support for streaming responses through the use of generator
# functions. A generator is a special function that can be interrupted and resumed.
v = VideoCamera()
score = []
question_no = [0]
final_score = []
ques = []
fin_dev = [0]
graph_lst = []
emotion_name = []
answer_dict = {}
demo_lst = []
score_lst = []

def gen(camera):
    "" "Helps in Passing frames from Web Camera to server"""
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')




###################################################################################


@app.route('/')
def Start():
    """ Renders the quiz Page """
    return render_template('Start.html')

@app.route('/start1.html')
def Start1():
    """ Renders the quiz Page """
    return render_template('start1.html')

@app.route('/start2.html')
def Start2():
    """ Renders the quiz Page """
    return render_template('start2.html')

@app.route('/start3.html')
def Start3():
    """ Renders the quiz Page """
    return render_template('start3.html')

@app.route('/quiz.html')
def Quiz():
    """ Renders the quiz Page """
    return render_template('quiz.html')

@app.route('/quiz2.html')
def Quiz2():
    """ Renders the quiz Page """
    return render_template('quiz2.html')

@app.route('/quiz3.html')
def Quiz3():
    """ Renders the quiz Page """
    return render_template('quiz3.html')

@app.route('/end.html')
def End():
    """ Renders the quiz Page """
    return render_template('end.html', graph_lst = graph_lst, score = round(sum(score_lst)/len(score_lst), 2))

@app.route('/answer.html')
def Ans():
    """ Renders the quiz Page """
    return render_template('answer.html', answer = answer_dict)

@app.route('/video_feed')
def video_feed():
    """ A route that returns a streamed response needs to return a Response object
    that is initialized with the generator function."""
    
    return Response(gen(v),
                    mimetype='multipart/x-mixed-replace; boundary=frame')



@app.route('/RealTime', methods=['POST'])
def RealTime():
    
    """ Video streaming (Real Time Image from WebCam Video) home page."""
    return render_template('RealTime.html')


@app.route('/takeimage', methods=['POST'])
def takeimage():
    lst1 = v.lst.copy()
    count1 = v.count
    Confusion = round(((0.3 * lst1[4]) + (0.35 * lst1[5]) + (0.35 * lst1[6]))/count1, 3)
    Satisfaction = round(((0.3 * lst1[4]) + (0.7 * lst1[3]))/count1, 3)
    Dissatisfaction = round(((0.3 * lst1[4]) + (0.7 * lst1[5]))/count1, 3)
    Frustrated = round(((0.3 * lst1[4]) + (0.35 * lst1[5]) + (0.35 * lst1[0]))/count1, 3)
    lst2 = [Confusion, Satisfaction, Dissatisfaction, Frustrated]
    lst_name = ["Confusion", "Satisfaction", "Dissatisfaction", "Frustrated"]
    demo_lst.append(lst2)
    emotion_name.append(lst_name[lst2.index(max(lst2))])
    dev = 0
    for i in range(4):
        dev = dev + ((normal_score[question_no[0]][i] - lst2[i])**2)

    val = round(math.sqrt(dev), 3)
    final_score.append(val)
    fin_dev[0] += val
    ques.append("ques" + str(question_no[0]+ 1))
    answer_dict[ques[-1]] = emotion_name[-1]
    if question_no[0] == 27:
        print(demo_lst)
    if question_no[0] in [8, 17, 27] :
        score_lst.append(round(math.sqrt(fin_dev[0]),2))
        q.put(graph_lst.append(graph(ques, final_score, emotion_name, round(math.sqrt(fin_dev[0]),2))))
        q.join()
        fin_dev[0] = 0
        final_score.clear()
        emotion_name.clear()
        ques.clear()
    
    question_no[0] = question_no[0] + 1

    v.lst = [0,0,0,0,0,0,0]
    v.count = 0
    return "1"


if __name__ == '__main__':
    app.run(debug=True)