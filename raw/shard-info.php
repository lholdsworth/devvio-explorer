<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Devvio | Shard info</title>

    <?php include('./inc/common-header.html') ?>

</head>
<body>

<div class="wrapper">

    
    <?php include('inc/header.php') ?>


    <section class="mainCont" id="shardInfo">
        <div class="container">

            <div class="shardLeft">
                    
                <div class="stats">

                    <div id="shardData">

                        <div id="shardResults"></div>
                        
                        <div class="loading"><img src="./assets/img/loader.gif" alt="loading, please wait"></div>

                    </div>

                </div>

            </div>    
        
            
            <div class="box shardBlocks">
                <h3>Most recent blocks</h3>

                <div class="boxCont">

                    <div class="shardInfoHeading">
                        <div class="col">Block height</div>
                        <div class="col">Block size</div>
                        <div class="col">Block time</div>
                        <div class="col">Prev. hash</div>
                        <div class="col">Transactions</div>
                    </div>

                    <div id="theBlockVals" class="ttips"><div class="loading"><img src="./assets/img/loader.gif" alt="loading, please wait"></div></div>

                </div>
            </div>

        </div>
    </section>

</div>

<?php include('./inc/footer.php') ?>
<?php include('./inc/scripts.html') ?>
    
</body>
</html>