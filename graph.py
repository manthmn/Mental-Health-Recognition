import matplotlib.pyplot as plt
import datetime

graph_lst = []
count = [0]

def graph(ques_list, score_lst, emotion_name, score):
    date_time = datetime.datetime.now()
    fig = plt.figure(figsize=(8, 5))
    
    plt.plot(ques_list, score_lst)
    for i in range(len(emotion_name)):
        plt.annotate(emotion_name[i], (ques_list[i], score_lst[i]))
    # Labelling the axes and title
    plt.xlabel("Questions")
    plt.ylabel("Deviation")
    plt.title("Facial Emotion Deviation Score for Set " + str(count[0]+ 1) + " is " + str(score))
    # Saving the Bar Plot
    path = "static/" + "bar_plot_" + str(count[0]) + date_time.strftime("%y%m%d%H%M%S") + ".png"
    print(path)
    plt.savefig(path)
    count[0] += 1
    return path