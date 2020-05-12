logins = []
passwords = []

print("1.Регистрация")
while True:
	login = input("Введите логин:")
	if len(login) not in range(5, 13):
		print("Неверный логин")
		continue
	else:
		break
logins.append(login)
password = input("Введите пароль:")
passwords.append(password)


print("2.Вход")
n = 0
while n == 0:
	login1 = input("Логин:")
	for i in range(len(logins)):
		if logins[i]== login1 :
			password1 = input("Пароль:")
			for i in range(len(logins)):
				if passwords[i] == password1:
					print("Вход успешно выполнен")
					n = 1
					break
				elif passwords[i]!= password1 :
					print("Неверный пароль")
					continue
		elif logins[i] != login1:
			print("Неверный логин")
			continue
