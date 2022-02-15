from app.models import db, Recipe, Category

# Adds a demo user, you can add other users here if you want
def seed_recipes():
    ramen = Recipe(
        name='Romaine Ramen', description='Ramen but with a flair of fiber!', user_id=1)
    cereal = Recipe(
        name='Banana Honey Nut Cheerio', description='Nanner, honey, and nuts? Yes, please.', user_id=2)
    grilled_cheese = Recipe(
        name='Grilled Cheese Almost Moldy', description='Grilled cheese when your bread is about to grow antibiotics.', user_id=3)
    spam_sandwich = Recipe(
        name='Spamich', description='Spam and bread? Yes, bro.', user_id=1)
    vienna_bread = Recipe(
        name='Bread Sog Sig', description='A taste of Italy in a can, baby.', user_id=2)
    water_bread = Recipe(
        name='Wet Toast', description='Some bread. Some wah wah.', user_id=3)

    breakfast_cat = Category(name='Breakfast')
    lunch_cat = Category(name='Lunch')
    snack_cat = Category(name='Snack')
    dinner_cat = Category(name="Dinner")


    ramen.categories.append(lunch_cat)
    cereal.categories.append(breakfast_cat)
    grilled_cheese.categories.append(snack_cat)
    spam_sandwich.categories.append(dinner_cat)
    vienna_bread.categories.append(lunch_cat)
    water_bread.categories.append(dinner_cat)


    db.session.add(ramen)
    db.session.add(cereal)
    db.session.add(grilled_cheese)
    db.session.add(spam_sandwich)
    db.session.add(vienna_bread)
    db.session.add(water_bread)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_recipes():
    db.session.execute('TRUNCATE recipes RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
