from django.db import models


class Voca(models.Model):
    word = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.word

    def noun(self):
        meaning = self.meanings.filter(type="noun")
        if meaning:
            return [" ".join(str(i).split(":")[-1].split(" ")[2:]) for i in meaning]
        else:
            return None

    def verb(self):
        meaning = self.meanings.filter(type="verb")
        if meaning:
            return [" ".join(str(i).split(":")[-1].split(" ")[2:]) for i in meaning]
        else:
            return None

    def adj(self):
        meaning = self.meanings.filter(type="adj")
        if meaning:
            return [" ".join(str(i).split(":")[-1].split(" ")[2:]) for i in meaning]
        else:
            return None

    def adverb(self):
        meaning = self.meanings.filter(type="adv")
        if meaning:
            return [" ".join(str(i).split(":")[-1].split(" ")[2:]) for i in meaning]
        else:
            return None

    def prep(self):
        meaning = self.meanings.filter(type="prep")
        if meaning:
            return [" ".join(str(i).split(":")[-1].split(" ")[2:]) for i in meaning]
        else:
            return None


class Meaning(models.Model):
    TYPE = [
        ("adj", "형용사"),
        ("verb", "동사"),
        ("noun", "명사"),
        ("adv", "부사"),
        ("prep", "전치사"),
    ]

    voca = models.ForeignKey(Voca, on_delete=models.CASCADE, related_name="meanings")
    type = models.CharField(max_length=10, choices=TYPE)
    definition = models.TextField()

    def __str__(self):
        return f"{self.voca.word} : {self.type} {self.definition}"
