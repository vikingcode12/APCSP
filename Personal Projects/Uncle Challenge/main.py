import tkinter as tk;

root = tk.Tk()

root.geometry(f'{640}x{480}')

# Create a label widget
label1 = tk.Label(root, text="Welcome To")
label2 = tk.Label(root, text="Weather Fetcher")

label1.grid(row=0, column=0)
label2.grid(row=1, column=0)

# Put it on the screen
# label1.pack()
# label2.pack()

root.winfo_toplevel().title("Weather Fetcher")

root.mainloop()