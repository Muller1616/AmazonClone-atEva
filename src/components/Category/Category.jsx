import {CategoryInfos} from './catagoryFullinfos'
import CategoryCard from './CategoryCard'
import classes from './category.module.css'
const Category = () => {
  return (
    <section className={classes.category_container}>
      {CategoryInfos.map((infos, index) => (
        <CategoryCard key={infos.id ?? index} data={infos} />
      ))}
    </section>
  )
}

export default Category